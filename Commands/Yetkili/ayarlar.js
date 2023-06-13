const { ChatInputCommandInteraction, SlashCommandBuilder, Client, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const mzrdb = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ayarlar")
    .setDescription("Ayarlarını Gösterir")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {

        const guildId = interaction.guild.id;
        const logKanalId = await mzrdb.get(`mzrlog_${guildId}`);

        const embed = new EmbedBuilder()
            .setTitle("Sunucu Ayarları <:settings:904101655535034448>")
            .setColor("#5865F2");

        const logKanal = interaction.guild.channels.cache.get(logKanalId);
        if (logKanal) {
            embed.addFields([
                {name: "Reklam Log Kanalı", value: logKanal.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "Reklam Log Kanalı", value: `Ayarlı Değil <:cross:904102980553437184>`, inline: false}
            ]);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};