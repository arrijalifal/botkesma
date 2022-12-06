const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv/config');

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log('BERHASIL ANJINGG!!!!');
    }
    else {
        console.error('pembacaan command error cuk!');
    }
}

client.customId = new Collection();

const customIdPath = path.join(__dirname, 'custom_id');
const customIdFiles = fs.readdirSync(customIdPath).filter(file => file.endsWith('.js'));

for (const file of customIdFiles) {
    const filePath = path.join(customIdPath, file);
    const custom_id = require(filePath);
    client.customId.set(custom_id.data, custom_id);
}

client.values = new Collection();

const valuesPath = path.join(__dirname, 'value_options');
const valuesFiles = fs.readdirSync(valuesPath).filter(file => file.endsWith('.js'));

for (const file of valuesFiles) {
    const filePath = path.join(valuesPath, file);
    const value_option = require(filePath);
    client.values.set(value_option.data, value_option);
}

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

client.login(process.env.TOKEN);