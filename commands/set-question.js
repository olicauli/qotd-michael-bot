const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Helpers = require('../helpers/helpers.js');
const Messages = require('../helpers/messages.js');
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
        await interaction.deferReply({ephemeral: true});
        const index = interaction.options.getInteger('index');

        if (index < 0)
        {
            Messages.feedback(interaction, "Row index can't be negative. Please enter a positive integer");
            return;
        }

        let config = Settings;
        config.qotd.rowIndex = index;
        Helpers.updateConfig(config);
        Messages.feedback(interaction, "Successfully updated the config!");
    }
}