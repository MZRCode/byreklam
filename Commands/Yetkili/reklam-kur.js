const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ModalBuilder, SelectMenuInteraction, InteractionType,  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reklam-kur")
        .setDescription("Reklam Paneli")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setEmoji(`<a:reklam:1114676513028190268>`)
                .setLabel(`Reklam Ver`)
                .setStyle(2)
                .setCustomId("reklamver")
        )
        
    const server = interaction.guild
    
    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
    .setTitle("Reklam Paneline Hoşgeldiniz!")
    .addFields(
        {
            name: "> Aşağıdaki butonları kullanarak paketlerden yararlanabilirsiniz.",
            value: "⠀"
        },
        {
            name: "<:bronze:1114669856378331157> - Bronz Paket 10₺",
            value: "**Reklamlar** kanalına @here ile reklamınız atılır."
        },
        {
            name: "<:iron:1114669873684025384> - Demir Paket ₺20",
            value: "**Reklamlar** kanalına @everyone ile reklamınız atılır."
        },
        {
            name: "<:gold:1114669890889064488> - Altın Paket 30₺",
            value: "Oda açılır ve @here atılır."
        },
        {
            name: "<:diamond:1114669981213401249> - Elmas Paket ₺40",
            value: "Oda açılır ve @everyone atılır."
        },
        {
            name: "<:ekal:1114677502800044192> - Ek Paket",
            value: "Süre attırma, @here veya @everyone göndertme."
        },
    )
    .setColor("Blurple")
    
    interaction.reply({content: `<:check:904101655316947024> | Embed başarıyla <#${interaction.channel.id}> kanalına gönderildi!`, ephemeral: true})
    interaction.channel.send({embeds: [embed], components: [row]})
    }
}
