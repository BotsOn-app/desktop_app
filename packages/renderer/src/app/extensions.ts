import { app } from "electron";
import * as fs from "fs";
export interface ExtensionAuthorInterfaces {
  id: string;
  name: string;
  avatarURL: string;
}

export interface ExtensionInterface {
  id: string;
  name: string;
  description: string;
  author: ExtensionAuthorInterfaces;
  version: string;
  path: string;
}

export class Extension {
  private static appData = app.getPath("userData");
  private static extensions: ExtensionInterface[] = this.loadExtensions();

  private static loadExtensions(): ExtensionInterface[] {
    if (!fs.existsSync(this.appData + "/extensions.json")) {
      fs.writeFileSync(this.appData + "/extensions.json", JSON.stringify([]));
    }

    return require(this.appData + "/extensions.json");
  }

  public static fromJSON(json: ExtensionInterface): Extension {
    return Extension.get(json.id);
  }

  public static getAll(): ExtensionInterface[] {
    return this.extensions;
  }

  public static get(id: string): ExtensionInterface | false {
    let extension = this.extensions.find((extension) => extension.id === id);

    // verif extension exist
    if (!extension) {
      return false;
    }

    return extension;
  }

  public static add(extension: ExtensionInterface): boolean {
    // verif extension not already exist
    let ids: string[] = this.extensions.map((extension) => extension.id);
    if (ids.includes(extension.id)) {
      return false;
    }

    this.extensions.push(extension);
    fs.writeFileSync(
      this.appData + "/extensions.json",
      JSON.stringify(this.extensions)
    );
    return true;
  }

  public static delete(id: string): boolean {
    let extension = this.extensions.find((extension) => extension.id === id);

    // verif extension exist
    if (!extension) {
      return false;
    }

    this.extensions.splice(this.extensions.indexOf(extension), 1);
    fs.writeFileSync(
      this.appData + "/extensions.json",
      JSON.stringify(this.extensions)
    );
    return true;
  }
}
