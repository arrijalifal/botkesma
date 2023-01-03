const { GoogleSpreadsheet } = require('google-spreadsheet');
const authacc = require('../config/botkesma-6cbc1f4e42d2.json');
const doc = new GoogleSpreadsheet('1bqZNr58HWQ3lz9bClu9zCmwruRmV2nPGeQE7Po0ssak');

async function authService() {
    await doc.useServiceAccountAuth({
        client_email: authacc.client_email,
        private_key: authacc.private_key
    });
}

async function getName(nrp) {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    rows = await sheet.getRows();
    for (x of rows) {
        if (x.nrp.trim() === nrp) {
            return x.name;
        };
    }
    return false;
}

async function infoBeasiswa(index) {
    await doc.loadInfo();
    const info = await doc.sheetsByTitle['Info Beasiswa'];
    const rows = await info.getRows();
    // console.log(rows[0].pendaftaran);
    // for (let i = 0; i <= info.columnCount; i++) {
    //     if (rows[i].pendaftaran) {
    //         console.log(`yang ada datanya : ${rows[i].nama_beasiswa}`);
    //     }
    // }
    let data = {
        'nama_beasiswa': rows[index].nama_beasiswa,
        'sumber': rows[index].sumber,
        'benefit': rows[index].benefit,
        'pendaftaran': rows[index].pendaftaran,
        'deadline': rows[index].deadline,
        'persyaratan': rows[index].persyaratan,
        'link_postingan': rows[index].link_postingan,
        'cara_mendaftar': rows[index].cara_mendaftar,
    };
    return data;
}

module.exports = {
    authService, getName, infoBeasiswa,
}