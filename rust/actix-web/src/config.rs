use solana_client::rpc_client::RpcClient;
use dotenv::dotenv;

pub fn get_solana_client() -> RpcClient {
    dotenv().ok();
    let rpc_url = std::env::var("RPC_URL").expect("RPC_URL must be set");
    RpcClient::new(rpc_url)
}