const { CronJob } = require('cron');
const Settings = require('../config.json');
//const guildId = process.env.GUILD_ID;
//const channelId = process.env.GENERAL_ID;
const Topic = require('../helpers/daily-topic.js');
const Sheets = require('../helpers/google-sheets');
const Helpers = require('../helpers/helpers.js');

/**
 * reads the question list from the google sheet below
 * and, every day at 10am, sends one of them.
**/
async function runDailyTopic(client, auth) {
    //console.log(Settings);
    //check if we're in a channel
    const guild = client.guilds.cache.get(Settings.guild);
    const channel = guild.channels.cache.get(Settings.channels['daily-question-channel']);

    let err = Helpers.checkGuildAndChannel(guild, channel);
    if (err) { console.log("ERROR: invalid guild or channel"); return; } //maybe add some actual error checking here later

    //get the list of questions from google sheets
    let questions = await Sheets.getColumnFromSheets(auth);
    if (questions == null) { console.log("ERROR: no data"); return; } //

    //read the config file
    let config = Settings;
    let schedule = Topic.schedule(config.qotd.day, config.qotd.hour, config.qotd.minute, config.qotd.second);
    //run the question
    //this completely breaks if .bind is removed btw. we need it to bind our variables
    const job = new CronJob(schedule, Topic.postQuestion.bind(this, config, questions, channel), null, true, 'America/Chicago');
  job.start();
}

module.exports = { runDailyTopic };