const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Yardım Menüsünü Gösterir"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        const embed = new EmbedBuilder()
        .setTitle("Yardım Menüm")
        .addFields([
            {name: "Yetkili Komutlarım", value: `<:moderator:904316800840380448> **/reklam-kur**\nReklam Embedını Gönderir.\n\n<:moderator:904316800840380448> **/log-ayarla**\nReklam Log kanalını ayarlarsınız.\n\n<:moderator:904316800840380448> **/log-sıfırla**\nReklam Log kanalını sıfırlarsınız.\n\n<:moderator:904316800840380448> **/ayarlar**\nAyarları görürsünüz.`, inline: false},
            {name: "Kullanıcı Komutlarım", value: `<:member:904102980536643614> **/yardım**\nYardım menüsünü gösterir\n\n<:member:904102980536643614> **/ping**\nBotun pingini gösterir\n\n<:member:904102980536643614> **/invite**\nBotu davet edersiniz ve destek sunucusuna katılabilirsiniz`, inline: true},
        ])
        .setColor("Blurple")
        interaction.reply({embeds: [embed], ephemeral: true});

    }

}
