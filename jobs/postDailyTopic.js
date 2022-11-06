const { CronJob } = require('cron');
const fs = require('fs');
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
    console.log(`guild from config: ${guildId}`);
    console.log(`channel from config: ${channelId}`);

    //check if we're in a channel
    const guild = client.guilds.cache.get(guildId);
    const channel = guild.channels.cache.get(channelId);

    let err = Helpers.checkGuildAndChannel(guild, channel);
    if (!err)
    {
      return;
    }

    //get the list of questions from google sheets
    let questions = await Sheets.getColumnFromSheets(auth);

    //read what row we're currently on and what
    //the name of the last thread is from the json file
    let row = JSON.parse(fs.readFileSync('./data/sheets-index.json'));
    //let config = Settings;

    const job = new CronJob('* * * * * *', async () => { //every day at 10am
      //if there was a previous thread, we need to archive it
      if (row.lastThread != "") 
      {
        Topic.lockAndArchiveOldThreads(channel, row.lastThread); 
      }
      if (row.index < questions.length) //if we're not at the end of the question list
      {
        row.lastThread = Topic.getThreadTitle();
        Topic.printQuestion(channel, questions, row.index++, row.lastThread);
        Topic.writeToFile(row);
      }
      else //if it's at the end of the question list,
      {
        await channel.send({
          content: "We're at the end of the question list! Starting from the beginning."
        });
        row.index = 0;
        row.lastThread = Topic.getThreadTitle();
        Topic.printQuestion(channel, questions, row.index++, row.lastThread);
        Topic.writeToFile(row);
      }
    }, null, true, 'America/Chicago');
    job.start();
  }

module.exports = { postTopic };