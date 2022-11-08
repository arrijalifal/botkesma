const { GoogleSpreadsheet } = require('google-spreadsheet');
const authacc = require('../config/botkesma-6cbc1f4e42d2.json');
// export var linkSheet = '';
// var doc = new GoogleSpreadsheet(linkSheet);
const doc = new GoogleSpreadsheet('1bqZNr58HWQ3lz9bClu9zCmwruRmV2nPGeQE7Po0ssak');
//'1bqZNr58HWQ3lz9bClu9zCmwruRmV2nPGeQE7Po0ssak'
async function authService(link) {
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

async function dapatkanInfo() {
    await doc.loadInfo();
    const info = doc.sheetsByTitle()
}

module.exports = {
    authService, getName
}