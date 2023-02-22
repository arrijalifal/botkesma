const { Events } = require('discord.js');
const detabase = require('../detabase/detabase.js');

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
                    const dcUser = await detabase.isRegistered(interaction.member.user.id, 1);
                    if (dcUser){
                        await detabase.accessTime(interaction.member.user.id);
                        await command.execute(interaction);
                    }
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