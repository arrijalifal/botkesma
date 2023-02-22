const loadfiles = require('./loadfiles.js');
const spreadsheet = require('./spreadsheet/spreadsheet.js');
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