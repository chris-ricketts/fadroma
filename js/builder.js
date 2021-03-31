import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { resolve, basename } from 'path'
import { spawnSync } from 'child_process'
import { homedir} from 'os'
import Docker from 'dockerode'
import { muted } from './say.js'

export default class SecretNetworkBuilder {

  constructor ({ say = mute(), outputDir, agent }) {
    Object.assign(this, { say, agent, outputDir })
  }

  workspace = repo => ({
    repo,
    crate: crate => ({
      repo,
      crate,
      deploy: (Contract, initData) => this.deploy(Contract, initData, { repo, crate })
    })
  })

  async deploy (
    Contract,
    data = {},
    options = {}
  ) {
    const {
      repo,
      crate,
      commit = 'HEAD',
      output = resolve(this.outputDir, `${crate}@${commit}.wasm`),
      binary = await this.build({crate, repo, commit, output}),
      label  = `${+new Date()}-${basename(binary)}`,
      agent  = this.agent,
      upload = await this.upload(binary, agent),
      codeId = upload.codeId,
      say = muted()
    } = options
    return new Contract({codeId, agent, say}).init({label, data})
  }

  async build ({crate, repo, origin, commit, output}) {
    const say = this.say.tag(`build(${crate}@${commit})`)
    if (existsSync(output)) {
      say.tag('cached')(output) // TODO compare against checksums
    } else {
      say.tag('building')(output)
      const { outputDir } = this
      const [{Error:err, StatusCode:code}, container] =
        (commit && commit !== 'HEAD')
        ? await buildCommit({ origin, commit, crate, outputDir })
        : await buildWorkingTree({ repo, crate, outputDir })
      await container.remove()
      if (err) throw new Error(err)
      if (code !== 0) throw new Error(`build exited with status ${code}`)
      say.tag('built')(output)
    }
    return output
  }

  async upload (binary) {
    const say = this.say.tag(`upload(${basename(binary)})`)

    // check for past upload receipt
    const chainId = await this.agent.API.getChainId()
    const receipt = `${binary}.${chainId}.upload`
    say({receipt})
    if (existsSync(receipt)) {
      const result = JSON.parse(await readFile(receipt, 'utf8'))
      return say.tag('cached')(result)
    }

    // if no receipt, upload anew
    say.tag('uploading')(binary)
    const result = await this.agent.API.upload(await readFile(binary), {})
    say.tag('uploaded')(result)
    await writeFile(receipt, JSON.stringify(result), 'utf8')
    return result
  }

}

export const buildWorkingTree = ({
  builder = 'hackbg/secret-contract-optimizer:latest',
  buildAs = 'root',
  repo,
  crate,
  outputDir,
  buildCommand = ['-c', getBuildCommand({crate, buildAs}).join(' && ')],
} = {}) => new Docker()
  .run(builder
      , [crate, 'HEAD']
      , process.stdout
      , { Env: getBuildEnv()
        , Tty: true
        , AttachStdin: true
        , HostConfig:
          { Binds: [ `sienna_cache_worktree:/code/target`
                   , `cargo_cache_worktree:/usr/local/cargo/`
                   , `${outputDir}:/output:rw`
                   , `${repo}:/src:rw` ] } })

export const buildCommit = ({
  builder = 'hackbg/secret-contract-optimizer:latest',
  buildAs = 'root',
  origin,
  commit,
  crate,
  outputDir,
  buildCommand = ['-c', getBuildCommand({origin, commit, crate, buildAs}).join(' && ')],
}={}) => new Docker()
  .run(builder
      , buildCommand
      , process.stdout
      , { Env: getBuildEnv()
        , Tty: true
        , AttachStdin: true
        , Entrypoint: '/bin/sh'
        , HostConfig:
          { Binds: [ `sienna_cache_${commit}:/code/target`
                   , `cargo_cache_${commit}:/usr/local/cargo/`
                   , `${outputDir}:/output:rw`
                   , `${resolve(homedir(), '.ssh')}:/root/.ssh:ro` ] } })

export const getBuildCommand = ({origin, commit, crate, buildAs}) => {
  let commands = [`mkdir -p /src && cd /src`]
  if (origin || commit) {
    commands = commands.concat(
      [ `git clone --recursive -n ${origin} .` // get the code
      , `git checkout ${commit}`               // checkout the expected commit
      , `git submodule update`                 // update submodules for that commit
      ])
  }
  commands = commands.concat(
    [ `chown -R ${buildAs} /src && ls`
    , `/entrypoint.sh ${crate} ${commit}`
    , `mv ${crate}.wasm /output/${crate}@${commit}.wasm`
    ])
  return commands
}

export const getBuildEnv = () =>
  [ 'CARGO_NET_GIT_FETCH_WITH_CLI=true'
  , 'CARGO_TERM_VERBOSE=true'
  , 'CARGO_HTTP_TIMEOUT=240' ]
