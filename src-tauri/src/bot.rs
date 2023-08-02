use core::panic;
use std::fs::{self, File};
use std::io::Write;

use serde::{Deserialize, Serialize};
use tauri::AppHandle;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Bot {
    pub token: String,
    client_id: String,
    avatar_url: String,
    name: String,
    extensions: Extensions,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Extensions(Vec<Extension>);

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Extension();

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),

    #[error(transparent)]
    Serde(#[from] serde_json::Error),

    #[error("The file is empty, cannot delete element")]
    Empty
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer : S) -> Result<S::Ok, S::Error>
    where
      S: serde::ser::Serializer,
    {
      serializer.serialize_str(self.to_string().as_ref())
    }
  }

impl Bot {
    pub fn new(token: String, client_id: String, avatar_url: String, name: String) -> Self {
        Bot {
            token,
            client_id,
            avatar_url,
            name,
            extensions: Extensions(Vec::new()),
        }
    }

    fn add_extension(&mut self, extension: Extension) {
        self.extensions.0.push(extension);
    }

    pub fn register(&self, app_handle: AppHandle) -> Result<Vec<Bot>, Error> {
        // Temporary variable but useful
        let binding = app_handle.path_resolver().app_data_dir().unwrap();
        let app_dir = binding.to_str().unwrap();

        // Create all parent dirs
        fs::create_dir_all(format!("{}/bots/{}", app_dir, self.name))?;
        
        // Create the index.js file
        let mut index = File::create(format!("{}/bots/{}/index.js", app_dir, self.name))?;
        
        let base_index_content = format!(
            r#"import {{ Bot }} from "botson_bot_engine";

let bot = new Bot({{
    CLIENT_ID: "{}",
    token: "{}",
}});

bot.login();
        "#,
            self.client_id, self.token
        );
        index.write_all(base_index_content.as_bytes())?;

        // Here we register the bot by creating its folders and the base index.js.
        // Cf this SO post about how to modify a file content (here to add new extensions to the file).
        // https://stackoverflow.com/questions/50689785/how-do-you-modify-a-files-contents-instead-of-prepending-to-the-file-in-rust
        self.append_to_json(app_dir)
    }


    // TODO: Check if the ressource does not already exists.
    fn append_to_json(&self, app_dir: &str) -> Result<Vec<Bot>, Error> {

        let path = format!("{}/bots/data.json", app_dir);

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
        let data = fs::read_to_string(&path)?;
        
        // Create an array of Bots representing the data.json file
        let mut bot_crate: Vec<Bot> = Vec::new();

        // Check if data.json file is empty or not (to see if it is worth to assign the content to bot_crate because if it is empty, it's the same as not assigning it)
        if fs::metadata(&path).unwrap().len() != 0 {
            bot_crate = serde_json::from_str(&data)?;
        }
        
        bot_crate.push(self.clone());

        // Turn back the virtual data.json to real json string
        let json: String = serde_json::to_string(&bot_crate)?;

        // Write the appended string to a new data.json file
        fs::write(&path, &json)?;

        Ok(bot_crate)
    }

}
