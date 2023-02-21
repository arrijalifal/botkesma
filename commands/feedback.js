const { ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const detabase = require('../detabase/detabase.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('berikan masukan untuk Bot Kesma'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('feedbackBot')
            .setTitle('Beri Kami Masukan');
        const user_feedback = new TextInputBuilder()
            .setCustomId('user_feedback')
            .setLabel("Masukan anda sangat berarti bagi kami 🙏")
            .setStyle(TextInputStyle.Paragraph);
        const textfield = new ActionRowBuilder().addComponents(user_feedback);
        modal.addComponents(textfield);

        await interaction.showModal(modal);
    }
}