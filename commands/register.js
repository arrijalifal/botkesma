const { SlashCommandBuilder } = require('discord.js');
const { Deta } = require('deta');
// const wait = require('node:timers/promises').setTimeout;
let spreadsheet = require('../spreadsheet/spreadsheet.js');
require('dotenv/config');

const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base('BotKesma');

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
        // await spreadsheet.authService();
        const name = await spreadsheet.getName(nrp);
        const isRegistered = await db.get(interaction.member.user.id);
        if (name) {
            if (isRegistered) {
                // console.log(isNRP);
                await interaction.editReply('Tidak perlu mendaftar ulang. Akun anda sudah disimpan ke dalam database!');
            } else {
                await db.put({'name': name.trim(), 'account': interaction.member.user.tag, 'nrp': nrp}, interaction.member.user.id);
                await interaction.editReply(`Akun anda telah terdaftar atas nama ${name} dengan username ${interaction.member.user}`);
            }
            // interaction.editReply('Akun anda telah terdaftar!');
        }
        else {
            await interaction.editReply('Anda bukan mahasiswa Teknik Komputer! Hubungi admin untuk informasi lebih lanjut.');
        }
    }
}