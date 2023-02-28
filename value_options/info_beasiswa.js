const { ActionRowBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const info = require('../commands/info.js');
const spreadsheet = require('../spreadsheet/spreadsheet.js');

module.exports = {
    data: 'info_beasiswa',
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL('https://docs.google.com/spreadsheets/d/1ljcr31wke6w-vSKVtxg2V_Va0ru4zxo4WWenaWNk47Q/edit#gid=0')
                    .setLabel('Lihat lebih lanjut')
                    .setStyle(ButtonStyle.Link)
            );
        const databeasiswa = await spreadsheet.infoBeasiswa();
        console.log(`info beasiswa : \n\n${databeasiswa}\n\n ==========`);
        var datas = {
            namabeasiswa : '',
            sumber: '',
            benefit: '',
            pendaftaran: '',
            deadline: '',
            linkpostingan: '',
            caramendaftar: '',
            timeline: '',
        };
        for (each of databeasiswa) {
            datas.namabeasiswa += each.nama_beasiswa + '\n',
            datas.sumber += each.sumber + '\n',
            datas.benefit += each.benefit + '\n',
            datas.pendaftaran += each.pendaftaran + '\n',
            datas.deadline += each.deadline + '\n',
            datas.linkpostingan += each.link_postingan + '\n',
            datas.caramendaftar += each.cara_mendaftar + '\n'
            datas.timeline += each.timeline + '\n'
        }
        // let infobeasiswa = 'Nama Beasiswa : ';
        // infobeasiswa += databeasiswa.nama_beasiswa + '\n';
        // infobeasiswa += 'Persyaratan :\n';
        // infobeasiswa += databeasiswa.persyaratan + '\n' + 'Deadline:\n';
        // infobeasiswa += databeasiswa.deadline;
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Beasiswa Terdekat Saat Ini')
            .setDescription('Beasiswa yang akan datang')
            .addFields(
                {name: 'Nama Beasiswa', value: datas.namabeasiswa, inline: true},
                {name: 'Sumber', value: datas.sumber, inline: true},
                {name: 'Benefit', value: datas.benefit, inline: true},
                {name: 'Pendaftaran', value: datas.pendaftaran, inline: true},
                {name: 'Deadline', value: datas.deadline, inline: true},
                {name: 'Link Postingan', value: datas.linkpostingan, inline: true},
                {name: 'Cara Mendaftar', value: datas.caramendaftar, inline: true},
                {name: 'Timeline', value: datas.timeline, inline: true},
            )
        await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
    }
}