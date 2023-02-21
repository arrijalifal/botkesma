const { Events } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');
const path = require('node:path');
const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isSelectMenu()) {
            const custom_id = interaction.client.customId.get(interaction.customId);
            try {
                custom_id.execute(interaction);
            }
            catch (error) {
                await interaction.reply({ content: 'There was an error', ephemeral: true });
            }
        }
        else if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

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
                        interaction.reply({ content: 'Akun anda belum terdaftar. Silakan gunakan command /register untuk mendaftarkan akun discord anda!', ephemeral: true });

                }
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error', ephemeral: true });
            }
        }
    },
}