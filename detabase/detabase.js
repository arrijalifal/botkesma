const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');
const spreadsheet = require('../spreadsheet/spreadsheet.js');

async function nrpLookup(nrp) {
    if (await db.get(nrp)) return true;
    return false;
}

async function saveName(data, key) {
    await db.put(data, key);
}