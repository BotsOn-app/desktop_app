use std::fs::File;
use std::io::Write;
pub struct Bot {
    token: String,
    path: String,
    extensions: Vec<Extension>,
}

pub struct Extension();

impl Bot {
    pub fn new(token: String, path: Option<String>, extensions: Vec<Extension>) -> Self {
        // Handle default path
        let _path = match path {
            Some(value) => value,
            None => "".to_owned(), // we have to actually determine what is the default path x)
        };
        Bot {
            token,
            path: _path,
            extensions,
        }
    }

    fn add_extension(&mut self, extension: Extension) {
        self.extensions.push(extension);
    }

    fn register() -> std::io::Result<()> {
        let mut index = File::create("index.js")?;
        match index.write_all(r#""#.as_bytes()) {
            Ok(val) => (),
            Err(e) => return Err(e),
        };
        // Here we register the bot by creating its folders and the base index.js.
        // Cf this SO post about how to modify a file content (here to add new extensions to the file).
        // https://stackoverflow.com/questions/50689785/how-do-you-modify-a-files-contents-instead-of-prepending-to-the-file-in-rust
        // Before doing anything here I need to define the architecture and make a graph.
        Ok(())
    }
}
