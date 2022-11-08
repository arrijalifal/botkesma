const { SlashCommandBuilder } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Kumpulan berbagai info')
        .addSubcommand(subcommand =>
            subcommand
                .setName('magang')
                .setDescription('Kumpulan informasi magang')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('beasiswa')
                .setDescription('Kumpulan informasi beasiswa')
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'magang':
                interaction.reply('ini magang');
            case 'beasiswa':
                interaction.reply('ini beasiswa');
        }
    }
}