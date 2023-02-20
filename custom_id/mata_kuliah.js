const { EmbedBuilder } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');
module.exports = {
    data: 'mata_kuliah',
    async execute(interaction) {
        let semester = interaction.values[0];
        matkulsemester = await spreadsheet.matkul_semester(semester);
        let text = "";
        for (eachmatkul of matkulsemester) {
            text += `${eachmatkul.matkul} - ${eachmatkul.sks} sks\n`;
        }
        const embed = new EmbedBuilder()
            .setTitle(`Mata Kuliah Semester ${semester[semester.length - 1]}`)
            .setDescription(text);
        await interaction.reply({content: '', embeds: [embed], ephemeral: true});
    }
}