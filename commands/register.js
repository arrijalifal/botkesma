const { SlashCommandBuilder } = require('discord.js');
const { Deta } = require('deta');
const wait = require('node:timers/promises').setTimeout;
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
    async execute(interaction, message) {
        const nrp = interaction.options.getString('nrp');
        await interaction.deferReply({ephemeral: true});
        await spreadsheet.authService();
        const name = await spreadsheet.getName(nrp);
        if (name) {
            try {
                db.insert({"account": interaction.member.user.tag, "name": name}, nrp);
            }
            catch (error) {
                
            }
            await interaction.editReply(`Akun anda telah terdaftar atas nama ${name}`);
            console.log(interaction.member.user.tag);
        }
        else {
            await interaction.editReply('Nama anda tidak ada di dalam database!');
        }
    }
}