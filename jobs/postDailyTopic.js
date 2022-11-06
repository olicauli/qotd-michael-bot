//code partially from here: https://developers.google.com/sheets/api/quickstart/nodejs

const { google } = require('googleapis');
const { CronJob } = require('cron');
const fs = require('fs');
const guildId = process.env.GUILD_ID;
const channelId = process.env.DAILY_TOPIC_ID;
const TEXT_CHANNEL = '0';
const Helpers = require('../helpers/helpers.js');

/**
 * reads the question list from the google sheet below
 * and, every day at 10am, sends one of them.
 * @see https://docs.google.com/spreadsheets/d/1shdx6hAiuUYrKclQReB_wtpRNk0mZvjpJ9JlF8olAsY/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function askQuestion(client, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1shdx6hAiuUYrKclQReB_wtpRNk0mZvjpJ9JlF8olAsY',
      range: 'Sheet1!A2:A', //the entire first column starting from the 2nd row
    });
  
    //check if there is data
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }

    //check if we're in a channel
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        return;
      }
    const channel = guild.channels.cache.get(channelId);
    if (!channel || channel.type != TEXT_CHANNEL) {
      return;
    }
    
    //read what row we're currently on and what
    //the name of the last thread is from the json file
    let row = JSON.parse(fs.readFileSync('./data/row-index.json'));

    const job = new CronJob('0 56 0 * * *', async () => { //every day at 10am
      //if there was a previous thread, we need to archive it
      if (row.lastThread != "")
      {
        const threads = channel.threads.cache.filter(x => x.name == row.lastThread);
        if (threads.length != 0)
        {
          threads.forEach(async thread => {
            if (!thread.locked && !thread.archived)
            {
              await thread.setLocked(true).catch(console.error);
              await thread.setArchived(true).catch(console.error);
            }
          });
        }
      }
      if (row.index < rows.length) //if we're not at the end of the question list
      {
        row.lastThread = Helpers.getTopicThreadTitle();
        printQuestion(channel, rows, row.index++, row.lastThread);
        writeToFile(row);
      }
      else //if it's at the end of the question list,
      {
        await channel.send({
          content: "We're at the end of the question list! Starting from the beginning."
        });
        //print the question, create a thread with the current date,
        //and update the file object.
        row.index = 0;
        row.lastThread = Helpers.getTopicThreadTitle();
        printQuestion(channel, rows, row.index++, row.lastThread);
        writeToFile(row);
      }
    }, null, true, 'America/Chicago');
    job.start();
  }

async function printQuestion(channel, twoDArr, index, tname)
{
  const message = await channel.send({
    content: `${twoDArr[index][0]}`
  });
  createThread(message, tname);
}

async function createThread(message, tname)
{
  //console.log(message);
  const thread = await message.startThread({
    name: tname,
    autoArchiveDuration: 1440, //1440 minutes = 24 hours
    reason: 'Thread for answering the daily topic',
  });

  console.log(`created thread ${thread.name}`);
}

function writeToFile(data)
{
  fs.writeFile('./data/row-index.json', JSON.stringify(data), function(err)
  {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = { askQuestion };