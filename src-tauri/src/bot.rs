use std::fs::File;
use std::io::Write;
pub struct Bot {
    token: String,
    path: String,
    client_id: String,
    guild_id: String,
    extensions: Vec<Extension>,
}

pub struct Extension();

impl Bot {
    pub fn new(token: String, client_id: String, guild_id: String, path: Option<String>) -> Self {
        // Handle default path
        let _path = match path {
            Some(value) => value,
            None => "".to_owned(), // we have to actually determine what is the default path x)
        };
        Bot {
            token,
            path: _path,
            client_id,
            guild_id,
            extensions: Vec::new(),
        }
    }

    fn add_extension(&mut self, extension: Extension) {
        self.extensions.push(extension);
    }

    pub fn register(&self) -> std::io::Result<()> {
        let mut index = File::create("index.js")?;
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
