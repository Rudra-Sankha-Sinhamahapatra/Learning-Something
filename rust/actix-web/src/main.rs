use actix_web::{App, HttpServer };
mod routes;
mod services;
mod config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting server on http://localhost:8080");
    
    HttpServer::new(|| {
        App::new()
        .configure(routes::solana::config)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
