const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log-sıfırla")
    .setDescription("Reklam Log kanalını sıfırlar"),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { guild } = interaction;

    let kanal = await db.fetch(`mzrlog_${guild.id}`);

    if (!kanal) {
      return interaction.reply({
        content: "Reklam Log kanalı ayarlanmamış zaten",
        ephemeral: true,
      });
    }

    db.delete(`mzrlog_${guild.id}`, kanal.id);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setTitle("Başarıyla Ayarlandı <:check:904101655316947024>")
      .setDescription("Reklam Log kanalı başarıyla sıfırlandı!")
      .setColor("#0BF3B7")
      .setTimestamp()
      .setFooter({ text:  `Ayarlamak için /kanal-ayarla` })

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
