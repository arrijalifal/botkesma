const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Kumpulan berbagai info'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('pilihinfo')
                    .setPlaceholder('Cari Info')
                    .addOptions(
                        {
                            label: 'Magang',
                            value: 'info_magang',
                        },
                        {
                            label: 'Beasiswa',
                            value: 'info_beasiswa'
                        },
                        {
                            label: 'Mata Kuliah',
                            value: 'mata_kuliah_semester'
                        }
                    )
            );
        await interaction.reply({ content: 'Silahkan pilih salah satu info melalui menu dropdown dibawah!', components: [row], ephemeral: true });
    }
}