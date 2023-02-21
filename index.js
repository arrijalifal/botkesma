// const { Client, GatewayIntentBits } = require('discord.js');
const loadfiles = require('./loadfiles.js');
const spreadsheet = require('./spreadsheet/spreadsheet.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv/config');

async function mainSpreadsheet() {
    await spreadsheet.authService();
}

loadfiles.commands();
loadfiles.customIds();
loadfiles.eventss();
loadfiles.valuesOptions();
mainSpreadsheet();

loadfiles.client.login(process.env.TOKEN);