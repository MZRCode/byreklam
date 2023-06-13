const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Botu yeniden başlat")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .setName("events")
    .setDescription("Eventsi yeniden başlat"))
    .addSubcommand((options) => options
    .setName("commands")
    .setDescription("Komudları yeniden başlat")),
}