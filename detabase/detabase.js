const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');
const db2 = deta.Base('Semester');
require('dotenv/config');
// const spreadsheet = require('../spreadsheet/spreadsheet.js');

async function isRegistered(data) {
    if (await db.get(data)) return true;
    return false;
}

async function saveName(data, key) {
    await db.put(data, key);
}

async function main() {
    await db2.put({
        data: 'semester 1',
    }, 'ga tau');
}

main()

module.exports = {
    isRegistered, saveName,
}