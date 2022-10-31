const { GoogleSpreadsheet } = require('google-spreadsheet');
const authacc = require('../config/botkesma-6cbc1f4e42d2.json');

const doc = new GoogleSpreadsheet('1bqZNr58HWQ3lz9bClu9zCmwruRmV2nPGeQE7Po0ssak');

async function main() {
    await doc.useServiceAccountAuth({
        client_email: authacc.client_email,
        private_key: authacc.private_key
    });
    
    await doc.loadInfo();
}

module.exports = {
    main,
}
// main();

// console.log(doc.title);
//     // await doc.updateProperties({ title: 'renamed doc '});
    
//     const sheet = doc.sheetsByIndex[0];
//     const row = await sheet.getRows()
//     console.log(row[296].name);
//     // console.log(sheet.title);
//     // console.log(sheet.rowCount);