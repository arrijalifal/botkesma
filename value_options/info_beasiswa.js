const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const info = require('../commands/info.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');

module.exports = {
    data: 'info_beasiswa',
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL('https://docs.google.com/spreadsheets/d/1ljcr31wke6w-vSKVtxg2V_Va0ru4zxo4WWenaWNk47Q/edit#gid=0')
                    .setLabel('Lihat lebih lanjut')
                    .setStyle(ButtonStyle.Link)
            );
        const databeasiswa = await spreadsheet.infoBeasiswa(1);
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