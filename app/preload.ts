import { ipcRenderer, contextBridge } from "electron"

const API = {
	showModal: () => ipcRenderer.send("showModal"),
};

contextBridge.exposeInMainWorld("api", API);
