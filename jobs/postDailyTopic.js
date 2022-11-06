const { CronJob } = require('cron');
const Settings = require('../config.json');
const guildId = Settings.guild;
//const guildId = process.env.GUILD_ID;
//const channelId = process.env.GENERAL_ID;
const channelId = Settings.channels['daily-question-channel'];
const Topic = require('../helpers/daily-topic.js');
const Sheets = require('../helpers/google-sheets');
const Helpers = require('../helpers/helpers.js');

/**
 * reads the question list from the google sheet below
 * and, every day at 10am, sends one of them.
**/
async function postTopic(client, auth) {
    //console.log(Settings);
    //check if we're in a channel
    const guild = client.guilds.cache.get(guildId);
    const channel = guild.channels.cache.get(channelId);

    let err = Helpers.checkGuildAndChannel(guild, channel);
    if (err)
    {
      return;
    }

    //get the list of questions from google sheets
    let questions = await Sheets.getColumnFromSheets(auth);

    //read what row we're currently on and what
    //the name of the last thread is from the json file
    //let row = JSON.parse(fs.readFileSync('./data/sheets-index.json'));
    let config = Settings;
    let schedule = Topic.schedule(config.qotd.day, config.qotd.hour,
      config.qotd.minute, config.qotd.second);
    console.log(schedule);

    const job = new CronJob(schedule, async () => { //every day at 10am
      //if there was a previous thread, we need to archive it
      if (config.qotd.lastThread != "") 
      {
        Topic.lockAndArchiveOldThreads(channel, config.qotd.lastThread); 
      }
      if (config.qotd.rowIndex < questions.length) //if we're not at the end of the question list
      {
        config.qotd.lastThread = Topic.getThreadTitle();
        Topic.printQuestion(channel, questions, config.qotd.rowIndex++, config.qotd.lastThread);
        Helpers.updateConfig(config);
      }
      else //if it's at the end of the question list,
      {
        await channel.send({
          content: "We're at the end of the question list! Starting from the beginning."
        });
        config.qotd.rowIndex = 0;
        config.qotd.lastThread = Topic.getThreadTitle();
        Topic.printQuestion(channel, questions, config.qotd.rowIndex++, config.qotd.lastThread);
        Helpers.updateConfig(config);
      }
    }, null, true, 'America/Chicago');
    job.start();
  }

module.exports = { postTopic };