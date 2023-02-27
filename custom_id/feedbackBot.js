const spreadsheet = require("../spreadsheet/spreadsheet.js");
module.exports = {
    data:'feedbackBot',
    async execute(interaction) {
        const feedbackUser = await interaction.fields.getTextInputValue('user_feedback');
        await spreadsheet.saveFeedback(interaction.member.user.id, feedbackUser);
        console.log(feedbackUser);
        await interaction.reply({content: "Terima kasih telah memberikan masukan kepada kami. Semoga Bot Kesma ini lebih berkembang lagi.", ephemeral: true})
    }
}