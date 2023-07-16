use std::fs::{self, File};
use std::io::Write;

use tauri::AppHandle;

pub struct Bot {
    token: String,
    client_id: String,
    guild_id: String,
    extensions: Vec<Extension>,
}

pub struct Extension();

impl Bot {
    pub fn new(token: String, client_id: String, guild_id: String) -> Self {
        Bot {
            token,
            client_id,
            guild_id,
            extensions: Vec::new(),
        }
    }

    fn add_extension(&mut self, extension: Extension) {
        self.extensions.push(extension);
    }

    // TODO: Handle errors on the UI side and create a custom error type
    pub fn register(&self, app_handle: AppHandle) -> std::io::Result<()> {
        let binding = app_handle.path_resolver().app_data_dir().unwrap();
        let app_dir = binding.to_str().unwrap();

        // TODO: Find out a way to get the name of the application (http request ?)
        let bot_name = "";

        fs::create_dir_all(format!("{}/bots/{}", app_dir, bot_name))?; // Create all parent dirs
        let mut index = File::create(format!("{}/bots/{}/index.js", app_dir, bot_name))?;

        println!("{}/bots/{}/index.js", app_dir, bot_name);
        let base_index_content = format!(
            r#"import {{ Bot }} from "botson_bot_engine";

let bot = new Bot({{
    CLIENT_ID: "{}",
    GUILD_ID: "{}",
    token: "{}",
}});

bot.login();
        "#,
            self.client_id, self.guild_id, self.token
        );
        index.write_all(base_index_content.as_bytes())?;

        // Here we register the bot by creating its folders and the base index.js.
        // Cf this SO post about how to modify a file content (here to add new extensions to the file).
        // https://stackoverflow.com/questions/50689785/how-do-you-modify-a-files-contents-instead-of-prepending-to-the-file-in-rust
        Ok(())
    }
}
