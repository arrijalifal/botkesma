const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const info = require('../commands/info.js');
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
        const databeasiswa = await spreadsheet.infoBeasiswa(0);
        let infobeasiswa = 'Nama Beasiswa : ';
        infobeasiswa += databeasiswa.nama_beasiswa + '\n';
        infobeasiswa += 'Persyaratan :\n';
        infobeasiswa += databeasiswa.persyaratan + '\n' + 'Deadline:\n';
        infobeasiswa += databeasiswa.deadline;
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Beasiswa Terdekat Saat Ini')
            .setDescription(infobeasiswa);
        await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
    }
}