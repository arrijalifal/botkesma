const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: 'info_magang',
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('info_beasiswa_lanjut')
                    .setLabel("Lihat lebih lanjut >>")
                    .setStyle(ButtonStyle.Primary)
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Magang Terdekat Saat Ini")
            .setDescription("Nggak ada wkwkwk");
        await interaction.reply({ content: "", ephemeral: true, embeds: [embed], components: [row] });
    }

}