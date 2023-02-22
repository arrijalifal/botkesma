const { SlashCommandBuilder } = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;
let spreadsheet = require('../spreadsheet/spreadsheet.js');
let detabase = require('../detabase/detabase.js');
require('dotenv/config');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('daftarkan akun anda ke database')
        .addStringOption(option =>
            option.setName('nrp')
                .setDescription('Input NRP anda!')
                .setRequired(true)
        ),
    async execute(interaction) {
        const nrp = interaction.options.getString('nrp');
        await interaction.deferReply({ ephemeral: true });
        const cData = await spreadsheet.getData(nrp);
        const isRegistered = await detabase.isRegistered(interaction.member.user.id, 1);
        if (cData) {
            if (isRegistered) {
                await detabase.accessTime(interaction.member.user.id);
                await interaction.editReply('Tidak perlu mendaftar ulang. Akun anda sudah disimpan ke dalam database!');
            } else {
                let data = {
                    name: cData.name,
                    account: interaction.member.user.tag,
                    nrp: nrp,
                };
                let ketemu = await detabase.isRegistered(data.name, 2);
                if (ketemu) {
                    await interaction.editReply('Mohon maaf, NRP anda telah terdaftar di akun discord yang lain. silakan hubungi admin untuk lebih lanjut.', );
                }
                else {
                    await detabase.accessTime(interaction.member.user.id);
                    await detabase.saveName(data, interaction.member.user.id);
                    await interaction.editReply(`Akun anda telah terdaftar atas nama ${cData.name} dengan username ${interaction.member.user}`);
                }
            }
            // interaction.editReply('Akun anda telah terdaftar!');
        }
        else {
            await interaction.editReply('Anda bukan mahasiswa Teknik Komputer! Hubungi admin untuk informasi lebih lanjut.');
        }
    }
}