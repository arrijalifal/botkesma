module.exports = {
    data: 'pilihinfo',
    async execute(interaction) {
        const value_option = interaction.client.values.get(interaction.values[0]);
        console.log(`value option yang ada di pilihinfo= ${value_option.data}`);
        try {
            value_option.execute(interaction);
        }
        catch(error) {
            interaction.editReply('There was an error catching the value!');
        }
    }
}