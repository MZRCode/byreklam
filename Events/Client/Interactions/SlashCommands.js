const { ChatInputCommandInteraction, Client } = require("discord.js");
const { DeveloperID } = require("../../../config.json")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "Bu komutun tarihi geçmis",
            ephemeral: true
        });

        if(command.developer && interaction.user.id !== DeveloperID)
        return interaction.reply({
            content: "Bu komudu sadece Developer'lar kullanabilir!",
            ephemeral: true
        });

        const subCommand = interaction.options.getSubcommand(false);
        if(subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if(!subCommandFile) return interaction.reply({
                content: "Bu subCommand artık kullanılmıyor",
                ephemeral: true
            });
            subCommandFile.execute();
        } else command.execute();
    }
}
