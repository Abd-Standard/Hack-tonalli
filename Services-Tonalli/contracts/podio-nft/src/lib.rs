//! # Tonalli Podium NFT Contract (Soroban)
//!
//! Emite NFTs de podio on-chain en Stellar cuando un usuario
//! gana una posición en el podio semanal de Tonalli.
//!
//! ## Funciones principales:
//! - `initialize(admin)` — configura el contrato
//! - `mint_podium_nft(week, address, rank, xlm_reward, tx_hash)` — emite el NFT de podio
//! - `get_podium_nft(week, address)` — consulta un NFT de podio
//! - `has_nft(week, address)` — verifica si existe el NFT
//! - `admin()` — obtiene el admin actual

#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Env, String, Symbol, symbol_short,
    log,
};

// ─── Storage Keys ────────────────────────────────────────────────────────────

const ADMIN_KEY: Symbol = symbol_short!("ADMIN");

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    /// (week, address) → PodiumNFT
    PodiumNft(String, Address),
}

// ─── Data Structures ─────────────────────────────────────────────────────────

/// Datos del NFT de podio emitido al ganar una posición semanal
#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct PodiumNFT {
    /// Posición en el podio (1, 2, o 3)
    pub rank: u32,
    /// Recompensa en XLM en stroops (1 XLM = 10_000_000 stroops)
    pub xlm_reward: u64,
    /// Semana del podio (ej. "2025-W12")
    pub week: String,
    /// Hash de la transacción XLM de recompensa
    pub tx_hash: String,
    /// Timestamp de emisión (ledger timestamp)
    pub issued_at: u64,
    /// Dirección del ganador
    pub owner: Address,
}

// ─── Contract ────────────────────────────────────────────────────────────────

#[contract]
pub struct PodioNftContract;

#[contractimpl]
impl PodioNftContract {

    // ── Initialization ───────────────────────────────────────────────────────

    /// Initializes the contract with the admin address (Tonalli backend)
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&ADMIN_KEY) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&ADMIN_KEY, &admin);
        log!(&env, "Tonalli Podium NFT Contract initialized. Admin: {}", admin);
    }

    // ── Mint ─────────────────────────────────────────────────────────────────

    /// Emits a podium NFT to a weekly winner. Only callable by the admin.
    ///
    /// # Parameters
    /// - `week`: Week identifier (e.g. "2025-W12")
    /// - `address`: Winner's Stellar address
    /// - `rank`: Podium position (1, 2, or 3)
    /// - `xlm_reward`: XLM reward in stroops
    /// - `tx_hash`: Hash of the XLM reward transaction
    pub fn mint_podium_nft(
        env: Env,
        week: String,
        address: Address,
        rank: u32,
        xlm_reward: u64,
        tx_hash: String,
    ) {
        // Only admin can mint
        let admin: Address = env.storage().instance().get(&ADMIN_KEY)
            .expect("Contract not initialized");
        admin.require_auth();

        // Validate rank
        if rank < 1 || rank > 3 {
            panic!("Rank must be 1, 2, or 3");
        }

        // Prevent double-minting for the same week + address
        let key = DataKey::PodiumNft(week.clone(), address.clone());
        if env.storage().persistent().has(&key) {
            panic!("NFT already minted for this address and week");
        }

        let nft = PodiumNFT {
            rank,
            xlm_reward,
            week: week.clone(),
            tx_hash,
            issued_at: env.ledger().timestamp(),
            owner: address.clone(),
        };

        env.storage().persistent().set(&key, &nft);

        // Emit event
        env.events().publish(
            (Symbol::new(&env, "mint_podium"), address.clone()),
            (rank, week.clone(), xlm_reward),
        );

        log!(&env, "Podium NFT minted: rank={}, week={}", rank, week);
    }

    // ── Queries ──────────────────────────────────────────────────────────────

    /// Returns the podium NFT for a given week and address, if it exists
    pub fn get_podium_nft(env: Env, week: String, address: Address) -> Option<PodiumNFT> {
        let key = DataKey::PodiumNft(week, address);
        env.storage().persistent().get(&key)
    }

    /// Returns true if the given address has a podium NFT for the given week
    pub fn has_nft(env: Env, week: String, address: Address) -> bool {
        let key = DataKey::PodiumNft(week, address);
        env.storage().persistent().has(&key)
    }

    /// Returns the current admin address
    pub fn admin(env: Env) -> Address {
        env.storage().instance().get(&ADMIN_KEY)
            .expect("Contract not initialized")
    }

    /// Transfers admin rights to a new address
    pub fn transfer_admin(env: Env, new_admin: Address) {
        let admin: Address = env.storage().instance().get(&ADMIN_KEY)
            .expect("Contract not initialized");
        admin.require_auth();
        env.storage().instance().set(&ADMIN_KEY, &new_admin);
        log!(&env, "Admin transferred to: {}", new_admin);
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env, Address, String};

    fn setup() -> (Env, PodioNftContractClient<'static>, Address) {
        let env = Env::default();
        env.mock_all_auths();
        let contract_id = env.register_contract(None, PodioNftContract);
        let client = PodioNftContractClient::new(&env, &contract_id);
        let admin = Address::generate(&env);
        client.initialize(&admin);
        (env, client, admin)
    }

    #[test]
    fn test_initialize() {
        let (env, client, admin) = setup();
        assert_eq!(client.admin(), admin);
    }

    #[test]
    fn test_mint_podium_nft() {
        let (env, client, _admin) = setup();
        let winner = Address::generate(&env);
        let week = String::from_str(&env, "2025-W12");

        client.mint_podium_nft(
            &week,
            &winner,
            &1,
            &100_000_000u64, // 10 XLM in stroops
            &String::from_str(&env, "abc123txhash"),
        );

        assert!(client.has_nft(&week, &winner));

        let nft = client.get_podium_nft(&week, &winner).unwrap();
        assert_eq!(nft.rank, 1);
        assert_eq!(nft.xlm_reward, 100_000_000);
        assert_eq!(nft.owner, winner);
    }

    #[test]
    fn test_has_nft_returns_false_when_missing() {
        let (env, client, _admin) = setup();
        let winner = Address::generate(&env);
        let week = String::from_str(&env, "2025-W01");

        assert!(!client.has_nft(&week, &winner));
    }

    #[test]
    fn test_get_podium_nft_returns_none_when_missing() {
        let (env, client, _admin) = setup();
        let winner = Address::generate(&env);
        let week = String::from_str(&env, "2025-W01");

        let result = client.get_podium_nft(&week, &winner);
        assert!(result.is_none());
    }

    #[test]
    #[should_panic(expected = "Contract already initialized")]
    fn test_double_initialize_fails() {
        let (env, client, admin) = setup();
        client.initialize(&admin);
    }

    #[test]
    #[should_panic(expected = "Rank must be 1, 2, or 3")]
    fn test_invalid_rank_fails() {
        let (env, client, _admin) = setup();
        let winner = Address::generate(&env);
        client.mint_podium_nft(
            &String::from_str(&env, "2025-W12"),
            &winner,
            &4, // invalid
            &50_000_000u64,
            &String::from_str(&env, "txhash"),
        );
    }

    #[test]
    #[should_panic(expected = "NFT already minted for this address and week")]
    fn test_double_mint_same_week_fails() {
        let (env, client, _admin) = setup();
        let winner = Address::generate(&env);
        let week = String::from_str(&env, "2025-W12");

        client.mint_podium_nft(
            &week, &winner, &1,
            &100_000_000u64,
            &String::from_str(&env, "tx1"),
        );
        // Second mint for same week + address should fail
        client.mint_podium_nft(
            &week, &winner, &2,
            &50_000_000u64,
            &String::from_str(&env, "tx2"),
        );
    }

    #[test]
    fn test_multiple_winners_same_week() {
        let (env, client, _admin) = setup();
        let winner1 = Address::generate(&env);
        let winner2 = Address::generate(&env);
        let winner3 = Address::generate(&env);
        let week = String::from_str(&env, "2025-W12");

        client.mint_podium_nft(&week, &winner1, &1, &100_000_000u64, &String::from_str(&env, "tx1"));
        client.mint_podium_nft(&week, &winner2, &2, &66_666_666u64, &String::from_str(&env, "tx2"));
        client.mint_podium_nft(&week, &winner3, &3, &33_333_333u64, &String::from_str(&env, "tx3"));

        assert!(client.has_nft(&week, &winner1));
        assert!(client.has_nft(&week, &winner2));
        assert!(client.has_nft(&week, &winner3));

        let nft1 = client.get_podium_nft(&week, &winner1).unwrap();
        let nft2 = client.get_podium_nft(&week, &winner2).unwrap();
        let nft3 = client.get_podium_nft(&week, &winner3).unwrap();

        assert_eq!(nft1.rank, 1);
        assert_eq!(nft2.rank, 2);
        assert_eq!(nft3.rank, 3);
    }
}
