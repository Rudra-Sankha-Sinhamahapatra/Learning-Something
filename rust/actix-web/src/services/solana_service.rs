use actix_web::web;
use solana_sdk::{native_token::LAMPORTS_PER_SOL, pubkey::Pubkey};
use serde::Serialize;

use crate::config::get_solana_client;

#[derive(Serialize)]
pub struct BalanceResponse {
   pub lamports: u64,
   pub sol: f64,
   pub address: String,
}

pub async fn get_balance(pubkey_str: &str) -> Result<BalanceResponse, String> {
    let address = pubkey_str.to_string();
    let pubkey_str = pubkey_str.to_string();

    let balance = web::block(move || -> Result<u64, String> {
        let client = get_solana_client();
        let pubkey = pubkey_str.parse::<Pubkey>().map_err(|e| e.to_string())?;
        let balance = client.get_balance(&pubkey).map_err(|e| e.to_string())?;
        Ok(balance)  
    })
    .await
    .map_err(|e| e.to_string())??;

    Ok(BalanceResponse { lamports: balance, sol: balance as f64 / LAMPORTS_PER_SOL as f64, address:address })
}