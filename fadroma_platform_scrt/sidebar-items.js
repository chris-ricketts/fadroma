initSidebarItems({"constant":[["BLOCK_SIZE",""],["MOCK_CONTRACT_ADDR",""]],"enum":[["BankMsg",""],["BankQuery",""],["CosmosMsg",""],["DistQuery",""],["GovMsg",""],["GovQuery",""],["MintQuery",""],["Order",""],["QueryRequest",""],["StakingMsg",""],["StakingQuery",""],["StdError","Structured error type for init, handle and query."],["SystemError","SystemError is used for errors inside the VM and is API friendly (i.e. serializable)."],["VoteOption",""],["WasmMsg",""],["WasmQuery",""]],"fn":[["bucket",""],["bucket_read",""],["canonize_maybe_empty","Attempting to canonicalize an empty address will fail.  This function skips calling `canonical_address` if the input is empty and returns `CanonicalAddr::default()` instead."],["coin",""],["coins",""],["currval","currval returns the last value returned by nextval. If the sequence has never been used, then it will return 0."],["debug_print",""],["export_schema",""],["export_schema_with_title",""],["from_binary",""],["from_slice",""],["has_coins","has_coins returns true if the list of coins has at least the required amount"],["humanize_maybe_empty","Attempting to humanize an empty address will fail.  This function skips calling `human_address` if the input is empty and returns `HumanAddr::default()` instead."],["log","A shorthand to produce a log attribute"],["mock_dependencies","All external requirements that can be injected for unit tests. It sets the given balance for the contract itself, nothing else"],["mock_dependencies_with_balances","Initializes the querier along with the mock_dependencies. Sets all balances provided (yoy must explicitly set contract balance if desired)"],["mock_env","Just set sender and sent funds for the message. The rest uses defaults. The sender will be canonicalized internally to allow developers pasing in human readable senders. This is intended for use in test code only."],["nextval","nextval increments the counter by 1 and returns the new value. On the first time it is called (no sequence info in db) it will return 1."],["plaintext_log","A shorthand to produce a plaintext log attribute"],["prefixed",""],["prefixed_read",""],["remove_schemas",""],["sequence","Sequence creates a custom Singleton to hold an empty sequence"],["singleton",""],["singleton_read",""],["space_pad","Take a Vec and pad it up to a multiple of `block_size`, using spaces at the end."],["to_binary",""],["to_cosmos_msg",""],["to_length_prefixed","Calculates the raw key prefix for a given namespace as documented in https://github.com/webmaster128/key-namespacing#length-prefixed-keys"],["to_length_prefixed_nested","Calculates the raw key prefix for a given nested namespace as documented in https://github.com/webmaster128/key-namespacing#nesting"],["to_vec",""],["transactional",""],["typed",""],["typed_read",""]],"macro":[["create_entry_points","This macro generates the boilerplate required to call into the contract-specific logic from the entry-points to the Wasm module."],["create_entry_points_with_migration","This macro is very similar to the `create_entry_points` macro, except it also requires the `migrate` method:"],["debug_print",""],["schema_for","Generates a `Schema` for the given type using default settings."]],"mod":[["testing",""],["testing",""]],"struct":[["AllBalanceResponse",""],["AllDelegationsResponse","DelegationsResponse is data format returned from StakingRequest::AllDelegations query"],["BalanceResponse",""],["BankQuerier",""],["Binary","Binary is a wrapper around Vec to add base64 de/serialization with serde. It also adds some helper methods to help encode inline."],["BlockInfo",""],["BondedDenomResponse","BondedDenomResponse is data format returned from StakingRequest::BondedDenom query"],["BondedRatioResponse","Bonded Ratio response"],["Bucket",""],["Callback","Info needed to have the other contract respond."],["CanonicalAddr",""],["Coin",""],["Context",""],["ContractInfo",""],["ContractInstantiationInfo","Info needed to instantiate a contract."],["ContractLink","Info needed to talk to a contract instance."],["Decimal","A fixed-point decimal value with 18 fractional digits, i.e. Decimal(1_000_000_000_000_000_000) == 1.0"],["Delegation","Delegation is basic (cheap to query) data about a delegation"],["Empty","An empty struct that serves as a placeholder in different places, such as contracts that don’t set a custom message."],["Env",""],["Extern","Holds all external dependencies of the contract. Designed to allow easy dependency injection at runtime. This cannot be copied or cloned since it would behave differently for mock storages and a bridge storage in the VM."],["FullDelegation","FullDelegation is all the info on the delegation, some (like accumulated_reward and can_redelegate) is expensive to query"],["HandleResponse",""],["HumanAddr",""],["InflationResponse","Inflation response"],["InitResponse",""],["LogAttribute",""],["MemoryStorage",""],["MessageInfo",""],["MigrateResponse",""],["MockApi",""],["MockQuerier","MockQuerier holds an immutable table of bank balances TODO: also allow querying contracts"],["PrefixedStorage",""],["ProposalsResponse","ProposalsResponse is data format returned from GovQuery::Proposals query"],["ReadonlyBucket",""],["ReadonlyPrefixedStorage",""],["ReadonlySingleton","ReadonlySingleton only requires a ReadonlyStorage and exposes only the methods of Singleton that don’t modify state."],["ReadonlyTypedStorage",""],["RepLog",""],["RewardsResponse","Rewards response"],["Singleton","Singleton effectively combines PrefixedStorage with TypedStorage to work on a single storage key. It performs the to_length_prefixed transformation on the given name to ensure no collisions, and then provides the standard TypedStorage accessors, without requiring a key (which is defined in the constructor)"],["StakingQuerier",""],["StorageTransaction",""],["TypedStorage",""],["Uint128",""],["UnbondingDelegationsResponse","UnbondingDelegationsResponse is data format returned from StakingRequest::UnbondingDelegations query"],["Validator",""],["ValidatorsResponse","ValidatorsResponse is data format returned from StakingRequest::Validators query"]],"trait":[["Api","Api are callbacks to system functions defined outside of the wasm modules. This is a trait to allow Mocks in the test code."],["Canonize",""],["Humanize",""],["Querier",""],["ReadonlyStorage","ReadonlyStorage is access to the contracts persistent data store"],["Storage",""]],"type":[["CodeHash",""],["CodeId",""],["ContractInstance",""],["HandleResult",""],["InitResult",""],["KV","KV is a Key-Value pair, returned from our iterators"],["MigrateResult",""],["MockQuerierCustomHandlerResult","The same type as cosmwasm-std’s QuerierResult, but easier to reuse in cosmwasm-vm. It might diverge from QuerierResult at some point."],["MockStorage",""],["QuerierResult","A short-hand alias for the two-level query result (1. accessing the contract, 2. executing query in the contract)"],["QueryResponse",""],["QueryResult",""],["StdResult","The return type for init, handle and query. Since the error type cannot be serialized to JSON, this is only available within the contract and its unit tests."],["SystemResult",""]]});