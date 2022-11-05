const { google } = require('googleapis');
const { CronJob } = require('cron');
const guildId = process.env.GUILD_ID;
const channelId = process.env.DAILY_TOPIC_ID;
const TEXT_CHANNEL = '0';

/**
 * Prints the names and majors of students in a sample spreadsheet:
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
  
    let i = 0;
    const job = new CronJob('* * * * * *', async () => { //every day at 10am
        if (i < rows.length)
        {
          await channel.send({
            content: `${rows[i++][0]}`
          });
        }
        else //if it's at the end of the question list,
        {
          //loop back to the beginning
          await channel.send({
            content: "We're at the end of the question list! Starting from the beginning."
          });
          i = 0;
          await channel.send({
            content: `${rows[i++][0]}`
          });
        }
        },
        null, true, 'America/Chicago');
    job.start();
  }

module.exports = { askQuestion };