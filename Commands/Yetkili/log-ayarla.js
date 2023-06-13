const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ChannelType } = require("discord.js");
const db = require("croxydb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log-ayarla")
    .setDescription("Reklam LOG Kanalını Ayarlarsınız")
    .addChannelOption((options) =>
    options
      .setName("kanal")
      .setDescription("Log kanalı olarak ayarlanacak kanal")
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  ),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, guild } = interaction;

    const kanal = options.getChannel("kanal");

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setTitle("Başarıyla Ayarlandı <:check:904101655316947024>")
      .setDescription(`Reklam Log kanalı ${kanal} olarak ayarlandı!`)
      .setColor("#0BF3B7")
      .setTimestamp()
      .setFooter({ text: `Sıfırlamak için /kanal-sıfırla` })

    interaction.reply({ embeds: [embed], ephemeral: true });

    db.set(`mzrlog_${guild.id}`, kanal.id);
  },
};
