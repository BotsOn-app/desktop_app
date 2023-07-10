#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod bot;

use tauri::api::path::{app_data_dir, data_dir};

use bot::Bot;

struct Cfg(Vec<Bot>);

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_bot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// This is a temporary solution
enum E {}

// AppHandle for future reference
#[tauri::command]
fn create_bot(app_handle: tauri::AppHandle, token: String, client_id: String, guild_id: String) {
    match Bot::new(token, client_id, guild_id).register(app_handle) {
        Ok(_) => (),
        Err(e) => println!("{}", e),
    };
}
