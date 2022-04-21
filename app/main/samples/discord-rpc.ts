import * as discordRPC from "discord-rpc"

const clientID = "960100262914183178"

discordRPC.register(clientID)

const rpc = new discordRPC.Client({ transport: "ipc" })
const startTimestamp = new Date()

rpc.on('ready', () => {
    rpc.setActivity({
        details: 'Dans le monde des bots',
        state: 'BotsOn',
        startTimestamp,
        largeImageKey: 'logo',
        largeImageText: 'BotsOn - Create Discord Bots',
        // smallImageKey: 'icon du bot',
        // smallImageText: 'Nom du bot',
        instance: false,
        buttons: [
            {
                label: 'Website',
                url: 'https://botson.app'
            },
        ]
    })
})

rpc.login({ clientId: clientID }).catch(console.error)
