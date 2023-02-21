const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');
const db2 = deta.Base('Terdaftar');
require('dotenv/config');
// const spreadsheet = require('../spreadsheet/spreadsheet.js');

async function isRegistered(data, which) {
    if ((which == 1)? await db.get(data) : await db.fetch({name: data.name})) return true;
    return false;
}

async function saveName(data, key) {
    await db.put(data, key);
    if (!isRegistered(data, 2)) {
        await db.put(data.account, data.name)
    }
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