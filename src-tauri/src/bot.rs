pub struct Bot {
    token: String,
    path: Option<String>,
    extensions: Vec<Extension>,
}

pub struct Extension();

impl Bot {
    pub fn new(token: String, path: Option<String>, extensions: Vec<Extension>) -> Self {
        Bot {
            token,
            path,
            extensions,
        }
    }

    fn add_extension(&mut self, extension: Extension) {
        self.extensions.push(extension);
    }

    fn register() {
        // Here we register the bot by creating its folders and the base index.js.
        // Cf this SO post about how to modify a file content (here to add new extensions to the file).
        // https://stackoverflow.com/questions/50689785/how-do-you-modify-a-files-contents-instead-of-prepending-to-the-file-in-rust
        // Before doing anything here I need to define the architecture and make a graph.
    }
}
