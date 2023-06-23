const { Client, GatewayIntentBits, Partials, Collection, PermissionFlagsBits, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, SelectMenuBuilder } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const config = require('./config.json');
const db = require('croxydb');
const { generateFromMessages } = require("discord-html-transcripts");

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.guildConfigs = new Collection();

const { loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);

client.on('interactionCreate', async (interaction) => {
  const channelMessages = await interaction.channel.messages.fetch();
  const logChannelId = await db.fetch(`mzrlog_${interaction.guild.id}`);
  const logChannel = client.channels.cache.get(logChannelId);

  if(interaction.customId === "reklamver") {

    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;

    const reklam1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`bronz`)
        .setLabel('Bronz Paket')
        .setEmoji("<:bronze:1114669856378331157>")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`demir`)
        .setLabel('Demir Paket')
        .setEmoji("<:iron:1114669873684025384>")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`altın`)
        .setLabel('Altın Paket')
        .setEmoji("<:gold:1114669890889064488>")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`elmas`)
        .setLabel('Elmas Paket')
        .setEmoji("<:diamond:1114669981213401249>")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`ekpaket`)
        .setLabel('Ek Paket')
        .setEmoji("<:ekal:1114677502800044192>")
        .setStyle(ButtonStyle.Secondary)
    );

const embed = new EmbedBuilder()
.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
.setDescription(`Selam **${interaction.user.username}**, Aşağıdaki paketlerden birini seçip reklamını yaptırıra bilirsin.`)
.setColor("Blue")

interaction.reply({embeds: [embed], ephemeral: true, components: [reklam1]})

}

if(interaction.customId === "bronz") {
  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;
  const mzrKanalı = db.get(`mzr_${guild.id}`);
  const açıkKanal = db.get(`mzrdev_${guild.id}`);

    if (mzrKanalı) {
      await interaction.reply({ content: `Mevcut bir ticket kanalın var.\n**Mevcut Kanal:** <#${açıkKanal}>`, ephemeral: true });
	} else {

  const channel = await guild.channels.create({
    name: `${user.username}-reklam`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ],
  })
  db.set(`mzrdev_${guild.id}`, channel.id);
  db.set(`mzr_${guild.id}`, user.id);

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(ButtonStyle.Danger)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kaydet`)
      .setLabel('Kaydet')
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
  .setDescription(`Selam Hoşgeldin **${user.username}**, işlemler için yetkilileri bekleyiniz.\nBirazdan senin ile ilgilenirler.\n\nKişinin Seçtiği: **Bronz Paket**`)
  .setColor("Blue")

  interaction.reply({content: `<:check:904101655316947024> | Kanalın başarıyla **açıldı!** Yetkililer ilgilenicek birazdan senin ile.\n<:chat:904102695613374485> | **Kanal:** <#${channel.id}>`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
  }
}

if(interaction.customId === "odeme") {
  
  const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`papara`)
      .setLabel('Papara')
      .setEmoji("<:papara:1114683533005439046>")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`ininal`)
      .setLabel('İninal')
      .setEmoji("<:ininal:1114683713343733840>")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: "Ödeme Yöntemleri", iconURL: client.user.avatarURL() })
  .setDescription("Aşağıdaki butonları kullanarak **ödeme yönteminizi** seçebilirsiniz.")
  .setColor("Blurple")

  interaction.reply({embeds: [embed], components: [row], ephemeral: true})

}

if(interaction.customId === "papara") {

  const papara = new EmbedBuilder()
  .setAuthor({name: "Papara Ödeme"})
  .addFields(
    {
      name: "Papara No:",
      value: "SIZIN PAPARA NONUZ",
      inline: true
    },
    {
      name: "Ad Soyad:",
      value: "AD SOYAD",
      inline: true
    },
  )
  .setColor("Green")

  interaction.reply({embeds: [papara], ephemeral: true})
}
if(interaction.customId === "ininal") {

  const ininal = new EmbedBuilder()
  .setAuthor({name: "İninal Ödeme"})
  .addFields(
    {
      name: "İninal No:",
      value: "SISIN ININAL HESAP NUMARANIZ",
      inline: true
    },
    {
      name: "Ad Soyad:",
      value: "AD SOYAD",
      inline: true
    },
  )
  .setColor("Green")

  interaction.reply({embeds: [ininal], ephemeral: true})
}

if(interaction.customId === "demir") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamMzR = db.fetch(`reklammzr_${guild.id}`);
  
  const mzrKanalı = db.get(`mzr_${guild.id}`);
  const açıkKanal = db.get(`mzrdev_${guild.id}`);

    if (mzrKanalı) {
      await interaction.reply({ content: `Mevcut bir ticket kanalın var.\n**Mevcut Kanal:** <#${açıkKanal}>`, ephemeral: true });
	} else {

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ],
  })
  db.set(`mzrdev_${guild.id}`, channel.id);
  db.set(`mzr_${guild.id}`, user.id);

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(ButtonStyle.Danger)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kaydet`)
      .setLabel('Kaydet')
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )
  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
  .setDescription(`Selam Hoşgeldin **${user.username}**, işlemler için yetkilileri bekleyiniz.\nBirazdan senin ile ilgilenirler.\n\nKişinin Seçtiği: **Demir Paket**`)
  .setColor("Blue")

  interaction.reply({content: `<:check:904101655316947024> | Kanalın başarıyla **açıldı!** Yetkililer ilgilenicek birazdan senin ile.\n<:chat:904102695613374485> | **Kanal:** <#${channel.id}>`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
	}
}
if(interaction.customId === "altın") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamMzR = db.fetch(`reklammzr_${guild.id}`);
  const mzrKanalı = db.get(`mzr_${guild.id}`);
  const açıkKanal = db.get(`mzrdev_${guild.id}`);

    if (mzrKanalı) {
      await interaction.reply({ content: `Mevcut bir ticket kanalın var.\n**Mevcut Kanal:** <#${açıkKanal}>`, ephemeral: true });
	} else {

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ],
  })
  db.set(`mzrdev_${guild.id}`, channel.id);
  db.set(`mzr_${guild.id}`, user.id);

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(ButtonStyle.Danger)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kaydet`)
      .setLabel('Kaydet')
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
  .setDescription(`Selam Hoşgeldin **${user.username}**, işlemler için yetkilileri bekleyiniz.\nBirazdan senin ile ilgilenirler.\n\nKişinin Seçtiği: **Altın Paket**`)
  .setColor("Blue")

  interaction.reply({content: `<:check:904101655316947024> | Kanalın başarıyla **açıldı!** Yetkililer ilgilenicek birazdan senin ile.\n<:chat:904102695613374485> | **Kanal:** <#${channel.id}>`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
	}
}
if(interaction.customId === "elmas") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamMzR = db.fetch(`reklammzr_${guild.id}`);
  const mzrKanalı = db.get(`mzr_${guild.id}`);
  const açıkKanal = db.get(`mzrdev_${guild.id}`);

    if (mzrKanalı) {
      await interaction.reply({ content: `Mevcut bir ticket kanalın var.\n**Mevcut Kanal:** <#${açıkKanal}>`, ephemeral: true });
	} else {

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ],
  })
  db.set(`mzrdev_${guild.id}`, channel.id);
  db.set(`mzr_${guild.id}`, user.id);

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(ButtonStyle.Danger)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kaydet`)
      .setLabel('Kaydet')
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
  .setDescription(`Selam Hoşgeldin **${user.username}**, işlemler için yetkilileri bekleyiniz.\nBirazdan senin ile ilgilenirler.\n\nKişinin Seçtiği: **Elmas Paket**`)
  .setColor("Blue")

  interaction.reply({content: `<:check:904101655316947024> | Kanalın başarıyla **açıldı!** Yetkililer ilgilenicek birazdan senin ile.\n<:chat:904102695613374485> | **Kanal:** <#${channel.id}>`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
	}
}
if(interaction.customId === "ekpaket") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamMzR = db.fetch(`reklammzr_${guild.id}`);
  const mzrKanalı = db.get(`mzr_${guild.id}`);
  const açıkKanal = db.get(`mzrdev_${guild.id}`);

    if (mzrKanalı) {
      await interaction.reply({ content: `Mevcut bir ticket kanalın var.\n**Mevcut Kanal:** <#${açıkKanal}>`, ephemeral: true });
	} else {

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ],
  })
  db.set(`mzrdev_${guild.id}`, channel.id);
  db.set(`mzr_${guild.id}`, user.id);

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(ButtonStyle.Danger)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kaydet`)
      .setLabel('Kaydet')
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
  .setDescription(`Selam Hoşgeldin **${user.username}**, işlemler için yetkilileri bekleyiniz.\nBirazdan senin ile ilgilenirler.\n\nKişinin Seçtiği: **Ek Paket**`)
  .setColor("Blue")

  interaction.reply({content: `<:check:904101655316947024> | Kanalın başarıyla **açıldı!** Yetkililer ilgilenicek birazdan senin ile.\n<:chat:904102695613374485> | **Kanal:** <#${channel.id}>`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
	}
}
if(interaction.customId === "kaydet") {
  const { user, member, channel } = interaction;

  if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({ content: "Dostum bu talebi kaydetmen için **Yönetici** yetkisine sahip olman gerekiyor!", ephemeral: true });
  }
  
  if (member.permissions.has(PermissionFlagsBits.Administrator)) {
    const logChannelId = await db.fetch(`mzrlog_${interaction.guild.id}`);
    const logChannel = client.channels.cache.get(logChannelId);
  
    if (!logChannel) {
      return interaction.reply({ content: "Reklam Log kanalı ayarlanmamış!", ephemeral: true });
    }
  
    interaction.reply({ content: `<:check:904101655316947024> Başarıyla <#${logChannelId}> kanalına gönderildi!`, ephemeral: true });
  }

    const logEmbed = new EmbedBuilder().setAuthor({name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setColor("Blurple").setTimestamp().setFooter({ text: "Başarıyla Kaydedildi!" })
    let logEmbedDescription = [
      `**Talep ile İlgilenen Yetkili:** ${member}`,
      `**Talebi Açan Kullanıcı:** ${user}`,
  ];

    let messagesToDelete = [];

    const messages = await channel.messages.fetch();
  
    messages.each((message) => {
      messagesToDelete.unshift(message);
    });
  
    const transcript = await generateFromMessages(messagesToDelete, channel);
  
    logChannel.send({
      embeds: [logEmbed.setTitle("Talep Başarıyla Kaydedildi <:check:904101655316947024>").setDescription(logEmbedDescription.join("\n"))],
      files: [transcript]
  });
};

if(interaction.customId === "kapat") {
  const { user, member, channel, guild } = interaction;

    const logChannelId = await db.fetch(`mzrlog_${interaction.guild.id}`);
    const logChannel = client.channels.cache.get(logChannelId);
	const mzrKanalı = db.get(`mzr_${guild.id}`);
	const açıkKanal = db.get(`mzrdev_${guild.id}`);
  
    if (!logChannel) {
      return interaction.reply({ content: "Reklam Log kanalı ayarlanmamış!", ephemeral: true });
    }
  
    interaction.reply({ content: `Kanal başarıyla **5 saniye** sonra otomatik olarak kapatılacaktır <:check:904101655316947024>` })

    const logEmbed = new EmbedBuilder().setAuthor({name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() }).setColor("Blurple").setTimestamp().setFooter({ text: "Başarıyla Talebi Kapattı!" })
    let logEmbedDescription = [
      `**Talebi Kapatan:** ${user}`,
  ];
  
    logChannel.send({
      embeds: [logEmbed.setTitle("Talep Başarıyla Kapatıldı <:check:904101655316947024>").setDescription(logEmbedDescription.join("\n"))]
      });
	db.delete(`mzr_${guild.id}`, user.id);
	db.delete(`mzrdev_${guild.id}`, channel.id);

    setTimeout(() => {
     channel.delete()
    }, 5000);
   }
});

client.login(client.config.token)
