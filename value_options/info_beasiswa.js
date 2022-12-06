const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: 'info_beasiswa',
    async execute(interaction) {
        await interaction.reply('Anjayy beasiswa');
    }
}