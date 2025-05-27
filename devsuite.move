module devsuite::DevSuiteAuth {

    use sui::object;
    use sui::tx_context;

    /// A minimal on-chain "account stamp" for user sessions
    struct DevSuiteUser has key {
        id: object::ID,
        owner: address,
        session_nonce: u64,
    }

    /// Register the signer as a user with a random nonce
    public fun register_user(ctx: &mut tx_context::TxContext): DevSuiteUser {
        let signer = tx_context::sender(ctx);
        DevSuiteUser {
            id: object::new(),
            owner: signer,
            session_nonce: tx_context::fresh_id(),
        }
    }

    /// For demo: regenerate session_nonce (to simulate auth rotation)
    public fun rotate_nonce(user: &mut DevSuiteUser, ctx: &mut tx_context::TxContext) {
        user.session_nonce = tx_context::fresh_id();
    }
}
