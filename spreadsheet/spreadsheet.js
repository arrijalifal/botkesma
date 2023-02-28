const { GoogleSpreadsheet } = require('google-spreadsheet');
const authacc = require('../config/botkesma-6cbc1f4e42d2.json');
const doc = new GoogleSpreadsheet('1bqZNr58HWQ3lz9bClu9zCmwruRmV2nPGeQE7Po0ssak');
const doc2 = new GoogleSpreadsheet('1oZphBlnsIIA6WlV_oLE7DTYdZ60q4heaKX9ba55kIPE');
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
    await doc2.useServiceAccountAuth({
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

async function saveFeedback(user_id, feedbackData) {
    await doc.loadInfo();
    const dateNow = new Date(Date.now()).toLocaleString('en-GB', {
        timeZone: "Asia/Jakarta",
    });
    const feedbackSheet = await doc.sheetsByIndex[1];
    feedbackSheet.addRow({timestamp: dateNow, user_id: user_id, feedback: feedbackData});
}

async function infoBeasiswa() {
    const date = Math.floor(new Date(Date.now()).getTime() / 1000);
    await doc2.loadInfo();
    const info = await doc2.sheetsByTitle['Beasiswa'];
    const rows = await info.getRows();
    console.log(`rows: \n\n${rows}\n\n==========`);
    let beasiswaData = [];
    for (x of rows) {
        if (x.nama_beasiswa == undefined) break;
        console.log(`===${x.nama_beasiswa}===${x.pendaftaran}`);
        let pendaftaran = x.pendaftaran;
        let [day, month, year] = pendaftaran.split('/')
        let waktuPendaftaran = Math.floor(new Date(year, month - 1, day).getTime() / 1000);
        console.log(`waktu pendaftaran = ${waktuPendaftaran}`);
        if (beasiswaData.length < 5 && waktuPendaftaran >= date) {
            beasiswaData.push(x);
        }
    }
    console.log(beasiswaData);
    return beasiswaData;
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
    authService, getData, infoBeasiswa, matkul_semester, saveFeedback,
}