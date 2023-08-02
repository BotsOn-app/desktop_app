#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod bot;

use std::fs::{File, self};

use bot::{Bot, Error};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_bot, delete_bot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn create_bot(app_handle: tauri::AppHandle, token: String, client_id: String, name: String, avatar_url: String) -> Result<Vec<Bot>, Error> {
    Bot::new(token, client_id, avatar_url, name).register(app_handle)
}

#[tauri::command]
fn delete_bot(app_handle: tauri::AppHandle, token: String) -> Result<Vec<Bot>, Error> {
    let binding: std::path::PathBuf = app_handle.path_resolver().app_data_dir().unwrap();
    let app_dir: &str = binding.to_str().unwrap();
    let path: String = format!("{}/bots/data.json", app_dir);

    // Handle any error on the opening of the data.json file
    let _ = match File::open(&path) {
        Ok(file) => file,
        Err(e) => match e.kind() {
            std::io::ErrorKind::NotFound => match File::create(&path) {
                Ok(fc) => fc,
                Err(err) => return Err(Error::Io(err)),
            },
            _ => panic!("{}", e)
        }
    };

    // Open as String the data.json file
    let data: String = fs::read_to_string(&path)?;
    
    // Create an array of Bots representing the data.json file
    let mut bot_crate: Vec<Bot> = Vec::new();

    // Check if data.json file is empty or not (if so, we cannot delete anything from something empty, even though we shouldn't be able to even invoke this function in this case)
    if fs::metadata(&path).unwrap().len() != 0 {
        bot_crate = serde_json::from_str(&data)?;
    } else {
        return Err(Error::Empty)
    }

    let idx: usize = bot_crate.iter().position(|x: &Bot| x.token == token).unwrap();
    bot_crate.remove(idx);

    // Turn back the virtual data.json to real json string
    let json: String = serde_json::to_string(&bot_crate)?;

    // Write the appended string to a new data.json file
    fs::write(&path, &json)?;

    Ok(bot_crate)
}