const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Helpers = require('../helpers/helpers.js');
const Settings = require('../config.json');

//commands composed of two members:
//data, which provides the command definition for registering to discord
//execute, which contains the functionality to run from the event handler
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-question')
        .setDescription('sets what row the bot will read from next for the QOTD.')
        .addIntegerOption(option =>
            option.setName('index')
            .setDescription('the index for the row you want to read from')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers), //anyone who can ban people can also use this command
    async execute(interaction)
    {
        const index = interaction.options.getInteger('index');
        let config = Settings;
        config.qotd.rowIndex = index;
        Helpers.updateConfig(config);
        await interaction.reply({ content: "Successfully updated the config!", ephemeral: true });
    }
}