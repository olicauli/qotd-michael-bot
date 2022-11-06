const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Sheets = require('../helpers/google-sheets.js');
const Topic = require('../helpers/daily-topic.js');
const Settings = require('../config.json');
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
        //get the questions
        const auth = await Sheets.authorize();
        let questions = await Sheets.getColumnFromSheets(auth);
        if (questions == null) {
            await interaction.reply({content: "ERROR: no data found! is the spreadsheet empty?", ephemeral: true}); 
            return; 
        }

        //get the argument
        const index = interaction.options.getInteger('index');
        console.log(index);
        if (index != null)
        {
            Settings.qotd.rowIndex = index;
        }

        //check channel
        const channel = interaction.guild.channels.cache.get(Settings.channels['daily-question-channel']);
        let err = Helpers.checkGuildAndChannel(interaction.guild, channel);

        if (err) { console.log("ERROR: invalid guild or channel"); return; } //maybe add some actual error checking here later
        Topic.postQuestion(Settings, questions, channel);
        await interaction.reply({content: "Successfully posted!", ephemeral: true});
    }
}