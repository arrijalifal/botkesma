const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');
const db2 = deta.Base('Terdaftar');
require('dotenv/config');

async function isRegistered(data, which) {
    switch (which) {
        case 1:
            if (await db.get(data)) return true;
            return false;
        case 2:
            console.log(data);
            let ketemu = await db.fetch({'name': data});
            // console.log(ketemu);
            if (ketemu.count != 0) return true;
            return false
    }
}

async function saveName(data, key) {
    await db.put(data, key);
    if (!isRegistered(data, 2)) {
        await db.put(data.account, data.name);
    }
}

module.exports = {
    isRegistered, saveName,
}