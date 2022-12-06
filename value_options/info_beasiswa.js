const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');

module.exports = {
    data: 'info_beasiswa',
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('info_beasiswa_lanjut')
                    .setLabel('Lihat lebih lanjut >>')
                    .setStyle(ButtonStyle.Primary)
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Beasiswa Terdekat Saat Ini')
            .setDescription("Ngakakkk cuuyyyyyy awookwokwokwokwokow");
        console.log(await spreadsheet.infoBeasiswa(0));
        await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
    }
}