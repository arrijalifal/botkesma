
module.exports = {
    data:'feedbackBot',
    async execute(interaction) {
        const feedbackUser = interaction.fields.getTextInputValue('user_feedback');
        console.log(feedbackUser);
        await interaction.reply({content: "Terima kasih telah memberikan masukan kepada kami. Semoga Bot Kesma ini lebih berkembang lagi.", ephemeral: true})
    }
}