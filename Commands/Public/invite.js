const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { DestekSunucuLink } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Beni Davet Et"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        let link_button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel('Davet Et')
            .setStyle(ButtonStyle.Link)
            .setEmoji('899716843709812777')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`))

            .addComponents(
            new ButtonBuilder()
            .setLabel('Topluluk Sunucusu')
            .setStyle(ButtonStyle.Link)
            .setEmoji('904316800840380448')
            .setURL(`${DestekSunucuLink}`))
            
            const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} Botuna Destek Ver`)
            .setDescription(`**${client.user.username}** Botunu kullanarak sunucunuza düzen katıp büyüte bilirsiniz.`)
            .setColor("#0099ff")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            return interaction.reply({ ephemeral: true, embeds: [embed], components: [link_button] })
        }
}
