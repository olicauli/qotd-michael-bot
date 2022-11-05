const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('replies with list of commands'),
    async execute(interaction)
    {
        await interaction.reply('ping, help');
    }
}