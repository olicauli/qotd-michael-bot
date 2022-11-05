//NOT WRITTEN BY ME, code is by cam!
//see the original repl.it: https://replit.com/@ATechAdventurer/Michael-Monday-Bot?v=1
const { CronJob } = require('cron');
const guildId = process.env.GUILD_ID;
const channelId = process.env.GENERAL_ID;
const TEXT_CHANNEL = '0';

function runMichaelMonday(client)
{
    const job = new CronJob('0 0 10 * * MON', async () => {
        console.log('in cronjob');
        const guild = client.guilds.cache.get(guildId);
        if (!guild) {
          return;
        }
        const channel = guild.channels.cache.get(channelId);
        if (!channel || channel.type != TEXT_CHANNEL) {
          return;
        }
    
        await channel.send({
          content: "It's Me and Michael Monday",
          files: ['assets/meandmichael.mp4']
        });
      }, null, true, 'America/Chicago');

      job.start();
}
  module.exports = { runMichaelMonday };