const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Id } = require('discord.js');

module.exports = {
    data: 'pilihinfo',
    async execute(interaction) {
        switch (interaction.values[0]) {
            case 'info_magang':
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('info_beasiswa_lanjut')
                            .setLabel("Lihat lebih lanjut >>")
                            .setStyle(ButtonStyle.Primary)
                    );
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Beasiswa Terdekat Saat Ini")
                    .setDescription("Nggak ada wkwkwk");
                await interaction.reply({ content: "", ephemeral: true, embeds: [embed], components: [row] });
                break;
            case 'info_beasiswa':
                await interaction.reply('info beasiswa');
                break;
        }
    }
}