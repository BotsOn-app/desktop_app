const { app, BrowserWindow, ipcMain } = require("electron");
const { join } = require("path");

app.whenReady().then(main);

function main() {
	const window = new BrowserWindow({
		width: 800,
		height: 650,
	});
	window.loadFile(join(__dirname, "../public/index.html"));
}

const showModal = () => {
	console.log("HELLO WORLD");
	const win = new BrowserWindow({ width: 300, height: 400 });
	win.loadFile(join(__dirname, "../public/auth.html"));
};

ipcMain.on("showModal", showModal);
