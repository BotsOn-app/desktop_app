import { app, BrowserWindow, ipcMain, protocol } from "electron"
import { join } from "path"

import "dotenv/config"

app.whenReady().then(main);

function main() {
	const window = new BrowserWindow({
		width: 800,
		height: 650,
		title: app.getName(),
		icon: join(__dirname, "../public/favicon.png"),
		webPreferences: {
			preload: join(__dirname, "preload.js"),
		}
	});

	if (process.env.DEV_MODE == "true") window.webContents.openDevTools({ mode: 'detach' });

	window.loadFile(join(__dirname, "../public/index.html"));
}

const showModal = () => {
	console.log("HELLO WORLD");
	const win = new BrowserWindow({ width: 300, height: 400 });
	win.loadFile(join(__dirname, "../public/auth.html"));
};

ipcMain.on("showModal", showModal);
