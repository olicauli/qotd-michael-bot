const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`ready! logged in as ${client.user.tag}`);

        const job = new CronJob('00 10 * * MON', async () => {
            const guild = client.guilds.cache.get(GUILD_ID);
            if (!guild) {
              return;
            }
            const channel = guild.channels.cache.get(CHANNEL_ID);
            if (!channel || channel.type != 'GUILD_TEXT') {
              return;
            }
            await channel.send({
              content: "It's Me and Michael Monday",
              files: ['meandmichael.mp4']
            });
          }, null, true, 'America/Chicago');
          job.start();

    },
};