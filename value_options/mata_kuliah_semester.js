const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
    data: 'mata_kuliah_semester',
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('mata_kuliah')
                    .setPlaceholder('Pilih semester')
                    .addOptions(
                        {
                            label: 'Semester 1',
                            value: 'semester_1'
                        },
                        {
                            label: 'Semester 2',
                            value: 'semester_2'
                        },
                        {
                            label: 'Semester 3',
                            value: 'semester_3'
                        },
                        {
                            label: 'Semester 4',
                            value: 'semester_4'
                        },
                        {
                            label: 'Semester 5',
                            value: 'semester_5'
                        },
                        {
                            label: 'Semester 6',
                            value: 'semester_6'
                        },
                        {
                            label: 'Semester 7',
                            value: 'semester_7'
                        },
                        {
                            label: 'Semester 8',
                            value: 'semester_8'
                        },
                    )
            );
        await interaction.update({ content: 'Semester berapa anda saat ini?', components: [row], ephemeral: true });
    }
}