const { ActivityType } = require("discord.js")
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.user.setActivity({
            name: 'YouTube: MZRDev',
            type: ActivityType.Streaming,
            url: "https://www.twitch.tv/mzrdev"
        });

        loadCommands(client);
    }
}