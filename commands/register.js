const { SlashCommandBuilder } = require('discord.js');
const { Deta } = require('deta');
const wait = require('node:timers/promises').setTimeout;
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
        await interaction.deferReply({ephemeral: true});
        try {
            // await db.insert({}, );
            await interaction.editReply('akun anda telah terdaftar!');
            await interaction.followUp({ content: `Halo anak bajingan ${nrp}!`, ephemeral: true });
        }
        catch (error) {

        }
        await wait(2000);
        const message = await interaction.fetchReply();
        console.log(message);
    }
}