const { Collection, Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.customId = new Collection();
client.values = new Collection();

module.exports = {
    client,
    commands() {
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log('BERHASIL');
            }
            else {
                console.error('pembacaan command error cuk!');
            }
        }
    },
    customIds() {
        const customIdPath = path.join(__dirname, 'custom_id');
        const customIdFiles = fs.readdirSync(customIdPath).filter(file => file.endsWith('.js'));

        for (const file of customIdFiles) {
            const filePath = path.join(customIdPath, file);
            const custom_id = require(filePath);
            client.customId.set(custom_id.data, custom_id);
        }
    },
    valuesOptions() {
        const valuesPath = path.join(__dirname, 'value_options');
        const valuesFiles = fs.readdirSync(valuesPath).filter(file => file.endsWith('.js'));

        for (const file of valuesFiles) {
            const filePath = path.join(valuesPath, file);
            const value_option = require(filePath);
            client.values.set(value_option.data, value_option);
        }
    },
    eventss() {
        const eventsPath = path.join(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}