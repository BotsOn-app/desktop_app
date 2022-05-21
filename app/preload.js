const { ipcRenderer, contextBridge } = require("electron");

const API = {
	showModal: () => ipcRenderer.send("showModal"),
};

contextBridge.exposeInMainWorld("api", API);
