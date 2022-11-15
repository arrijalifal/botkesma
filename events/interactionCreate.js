const { Events } = require('discord.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isSelectMenu()) {
            if (interaction.customId === 'pilihinfo') {
                switch (interaction.values[0]) {
                    case 'info_magang':
                        await interaction.editReply('info magang');
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
                await command.execute(interaction);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error', ephemeral: true });
            }
        }
    },
}