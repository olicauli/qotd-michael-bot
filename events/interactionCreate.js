//code modified from here:
//https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction)
    {
        if (!interaction.isChatInputCommand()) return; //if it's not a slash command, return
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command)
        {
            console.error(`no command matching ${interaction.commandName} was found`);
            return;
        }
        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({ content: "there was an error. oopsie", ephemeral: true});
        }
        console.log(`${interaction.commandName} executed!`);
    }
}