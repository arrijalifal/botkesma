const { GoogleSpreadsheet } = require('google-spreadsheet');
const authacc = require('../config/botkesma-6cbc1f4e42d2.json');
const doc = new GoogleSpreadsheet('1bqZNr58HWQ3lz9bClu9zCmwruRmV2nPGeQE7Po0ssak');
const matkulsheets = new GoogleSpreadsheet('1N94WySVxXRisbGnuxvTT6Vq34lnA5iSFNkMXHDn_Zpg');

async function authService() {
    await doc.useServiceAccountAuth({
        client_email: authacc.client_email,
        private_key: authacc.private_key
    });
    await matkulsheets.useServiceAccountAuth({
        client_email: authacc.client_email,
        private_key: authacc.private_key
    });
    console.log('berhasil autentikasi ke google');
}

async function getData(nrp) {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    rows = await sheet.getRows();
    for (x of rows) {
        if (x.nrp.trim() === nrp) {
            let data = {
                name: x.name,
                nrp: x.nrp,
                semester: x.semester,
            }
            return data;
        };
    }
    return false;
}

async function infoBeasiswa(index) {
    await doc.loadInfo();
    const info = await doc.sheetsByTitle['Info Beasiswa'];
    const rows = await info.getRows();
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

async function matkul_semester(semester) {
    await matkulsheets.loadInfo();
    const data = await matkulsheets.sheetsByTitle[semester];
    console.log(`jumlah row di matkul ${semester} = ${data.rowCount}`)
    const rows = await data.getRows();
    console.log(`jumlah row di data rows = ${rows.length}`);
    var list_matkul = [];
    for (mk of rows) {
        if (!mk.kode_matkul) continue;
        let data = {
            matkul: mk.matkul,
            sks: mk.sks,
        }
        list_matkul.push(data);
    }
    return list_matkul;
}

module.exports = {
    authService, getData, infoBeasiswa, matkul_semester,
}