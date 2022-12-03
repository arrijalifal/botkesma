const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');
const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isSelectMenu()) {
            if (interaction.customId === 'pilihinfo') {
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
        else if (interaction.isChatInputCommand()) {


            console.log(interaction);

            const command = interaction.client.commands.get(interaction.commandName);
            // const selected = interaction.values[0];

            if (!command) {
                console.error('No matching command was found!');
            }

            try {
                if (interaction.commandName == 'register') {
                    command.execute(interaction);
                }
                else {
                    const dcUser = await db.get(interaction.member.user.id);
                    if (dcUser)
                        await command.execute(interaction);
                    else
                        interaction.reply({ content: 'Akun anda belum terdaftar!', ephemeral: true });

                }
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error', ephemeral: true });
            }
        }
    },
}