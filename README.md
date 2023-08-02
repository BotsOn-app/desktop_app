# BotsOn Core App

This is the app that we distribute to make discord bot development way easier.

## How does it works ?

## How to contribute ?
To contribute, you'll need to install some dependencies on your machine that you can find on the [official website](https://tauri.app/v1/guides/getting-started/prerequisites) and the Tauri CLI that you can install with cargo (which comes with rustup) using the following command :
```bash
cargo install tauri-cli
```
When done, you can then follow these steps :
```bash
cd desktop_app
npm i 
cargo tauri dev
```

This will install the npm dependencies as well as the cargo dependencies, then run the project.  
NOTE: The `cargo tauri dev` command only installs the dependencies once, so the first run is the longest.
