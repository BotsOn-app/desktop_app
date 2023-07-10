#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod bot;

use bot::Bot;

struct Cfg(Vec<Bot>);

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub fn create_bot(token: String, path: String, client_id: String, guild_id: String) {
    let bot = Bot::new(token, client_id, guild_id, Some(path));
    bot.register();
    // Cfg.0::push(bot)
}
 