use actix_web::{get,web,HttpResponse};
use crate::services::solana_service::get_balance;

#[get("/balance/{pubkey}")]
async fn balance(pubkey: web::Path<String>) -> HttpResponse {
    match get_balance(&pubkey).await {
        Ok(balance) => HttpResponse::Ok().json(balance),
        Err(e) => HttpResponse::InternalServerError().body(e),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/solana").service(balance));
}