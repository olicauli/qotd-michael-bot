const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Sheets = require('../helpers/google-sheets.js');
const Topic = require('../helpers/daily-topic.js');
const Settings = require('../config.json');
const Messages = require('../helpers/messages.js');
const Helpers = require('../helpers/helpers.js');

//commands composed of two members:
//data, which provides the command definition for registering to discord
//execute, which contains the functionality to run from the event handler
module.exports = {
    data: new SlashCommandBuilder()
        .setName('post-question')
        .setDescription('posts a question in the QOTD channel. for if the schedule messes up')
        .addIntegerOption(option =>
            option.setName('index')
            .setDescription('the row to post; if left empty, it will simply post the next sequential question')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction)
    {
        await interaction.deferReply({ephemeral: true});

        //get the argument
        const index = interaction.options.getInteger('index');
        //console.log(index);
        if (index < 0)
        {
            Messages.feedback(interaction, "Row index can't be negative. Please enter a positive integer");
            return;
        }
        else if (index != null)
        {
            Settings.qotd.rowIndex = index;
        }

        //get the questions
        const auth = await Sheets.authorize();
        let questions = await Sheets.getColumnFromSheets(auth);
        if (questions == null) {
            Messages.feedback(interaction, "No data found! Is the spreadsheet empty?"); 
            return; 
        }

        //check channel
        const channel = interaction.guild.channels.cache.get(Settings.channels['daily-question-channel']);
        let err = Helpers.checkGuildAndChannel(interaction.guild, channel);

        if (err) { console.log("ERROR: invalid guild or channel"); return; } //maybe add some actual error checking here later
        Topic.postQuestion(Settings, questions, channel);
        Messages.feedback(interaction, "Successfully posted!");
    }
}