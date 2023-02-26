const { Deta } = require('deta');
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');
const ac = deta.Base('Akses');
require('dotenv/config');

async function isRegistered(data, which) {
    switch (which) {
        case 1:
            if (await db.get(data)) return true;
            return false;
        case 2:
            console.log(data);
            let ketemu = await db.fetch({ 'name': data });
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

async function accessTime(user_id) {
    const tgl = new Date().toLocaleDateString('id-ID', {
        timeZone: 'Asia/Jakarta'
    }).split("/");
    let day = tgl[0];
    let month = Number(tgl[1]);
    let year = tgl[2];

    let fullTanggal = `${day}_${(month < 10) ? `0${month}` : `${month}`}_${year}`
    let sekarang = await ac.get(fullTanggal);
    if (sekarang) {
        let listuser = sekarang.user_accessed;
        if (!listuser.includes(user_id)) {
            const update = {
                user_accessed: ac.util.append(user_id),
                total: ac.util.increment(),
            }
            ac.update(update, fullTanggal);
        }
    }
    else {
        await ac.put({ user_accessed: [user_id], total: 1 }, fullTanggal);
    }
}

module.exports = {
    isRegistered, saveName, accessTime
}