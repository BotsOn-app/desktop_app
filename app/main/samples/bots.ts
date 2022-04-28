import { app } from "electron";
import fs from "fs";

export interface BotInterface {
  id: string;
  name: string;
  avatarURL: string;
}

export class Bots {
  public static addBot(token: string) {
    new AddBot(token);
  }
}

class AddBot {
  private userData = app.getPath("userData");

  constructor(private token: string) {
    this.add();
  }

  private async add() {
    let info = await this.getInfo();

    info.json().then((bot: BotInterface) => {
      if (this.fileExists()) {
        if (!this.botExists(bot)) {
          const botsFile = `${this.userData}/bots.json`;
          const bots = JSON.parse(fs.readFileSync(botsFile, "utf8"));

          bots.push(bot);

          fs.writeFileSync(botsFile, JSON.stringify(bots));
        }
      } else {
        const bots = [bot];

        fs.writeFileSync(`${this.userData}/bots.json`, JSON.stringify(bots));
      }
    });
  }

  private async getInfo() {
    return await fetch(`https://discordapp.com/api/users/@me`, {
      headers: {
        Authorization: `Bot ${this.token}`,
      },
    });
  }

  private fileExists() {
    return fs.existsSync(`${this.userData}/bots.json`);
  }

  private botExists(bot: BotInterface) {
    const botsFile = `${this.userData}/bots.json`;
    const bots = JSON.parse(fs.readFileSync(botsFile, "utf8"));

    return bots.find((b: BotInterface) => b.id === bot.id);
  }
}
