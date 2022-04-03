import { app } from 'electron';
import * as fs from 'fs';

export interface BotInterfaces {
  id: string
  name: string
  avatarURL: string
  accent_color: number
  token: string
  extensions: string[]
}

export class Bot {
  private static appData = app.getPath("userData")
  private static bots: BotInterfaces[] = this.loadBots()

  private static loadBots(): BotInterfaces[] {
    // Verif bots.json exist or create it
    if (!fs.existsSync(this.appData + "/bots.json")) {
      fs.writeFileSync(this.appData + "/bots.json", JSON.stringify([]))
    }

    return require(this.appData + "/bots.json")
  }

  public static fromJSON(json: BotInterfaces): Bot {
    return Bot.get(json.id)
  }

  public static getAll(): BotInterfaces[] {
    return this.bots
  }

  public static get(id: string): BotInterfaces|false {
    let bot = this.bots.find(bot => bot.id === id)

    // verif bot exist
    if (!bot) {
      return false
    }

    return bot
  }

  public static add(bot: BotInterfaces): boolean {

    // verif bot not already exist
    let ids: string[] = this.bots.map(bot => bot.id)
    if (ids.includes(bot.id)) {
      return false
    }

    this.bots.push(bot)
    fs.writeFileSync(this.appData + "/bots.json", JSON.stringify(this.bots))
    return true
  }

  public static delete(id: string): boolean {
    let bot = this.bots.find(bot => bot.id === id)

    // verif bot exist
    if (!bot) {
      return false
    }

    this.bots.splice(this.bots.indexOf(bot), 1)
    fs.writeFileSync(this.appData + "/bots.json", JSON.stringify(this.bots))
    return true
  }

  public static addExtension(botId: string, extension: string): boolean {
    let bot = this.bots.find(bot => bot.id === botId)

    // verif bot exist
    if (!bot) {
      return false
    }

    bot.extensions.push(extension)
    fs.writeFileSync(this.appData + "/bots.json", JSON.stringify(this.bots))
    return true
  }

  public static removeExtension(botId: string, extension: string): boolean {
    let bot = this.bots.find(bot => bot.id === botId)

    // verif bot exist
    if (!bot) {
      return false
    }

    bot.extensions.splice(bot.extensions.indexOf(extension), 1)
    fs.writeFileSync(this.appData + "/bots.json", JSON.stringify(this.bots))
    return true
  }

  public static getExtensions(botId: string): string[] {
    let bot = this.bots.find(bot => bot.id === botId)

    // verif bot exist
    if (!bot) {
      return []
    }

    return bot.extensions
  }

  public static getToken(botId: string): string|false {
    let bot = this.bots.find(bot => bot.id === botId)

    // verif bot exist
    if (!bot) {
      return false
    }

    return bot.token
  }
}