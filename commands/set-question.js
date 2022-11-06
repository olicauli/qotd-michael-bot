const { SlashCommandBuilder } = require('discord.js');

//commands composed of two members:
//data, which provides the command definition for registering to discord
//execute, which contains the functionality to run from the event handler
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-question')
        .setDescription('replies with pong'),
    async execute(interaction)
    {
        await interaction.reply('PONG');
    }
}