const { SlashCommandBuilder } = require('discord.js');

//commands composed of two members:
//data, which provides the command definition for registering to discord
//execute, which contains the functionality to run from the event handler
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction)
    {
        await interaction.channel.send({content: 'Loading data...', ephemereal: true })
        .then(async (response) => {
            response.delete();
            await interaction.reply(`PONG! latency is ${response.createdTimestamp - interaction.createdTimestamp}ms`);
        });
    }
}