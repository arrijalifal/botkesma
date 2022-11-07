const { SlashCommandBuilder } = require('discord.js');

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
        
    }
}