const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const TEXT_CHANNEL = '0';
const DEFAULT_COLOR = 0x0061ff;

// inside a command, event listener, etc.
async function sendEmbed(channel, color, content)
{
    const embed = new EmbedBuilder()
	.setColor(color)
	.setDescription(content)
return await channel.send({ embeds: [embed] });
}

function inGuild(guild)
{
    return guild? true: false;
}

function inChannel(channel)
{
    return (channel && channel.type == TEXT_CHANNEL)? true: false;
}

function checkGuildAndChannel(guild, channel)
{
    if (!inGuild(guild) || !inChannel(channel))
    {
        console.error(`ERROR: guild is ${guild} and channel is ${channel}`);
        return 1;
    }
    return 0;
}

function updateConfig(data)
{
  fs.writeFile('./config.json', JSON.stringify(data, null, 4), function(err)
  {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {sendEmbed, checkGuildAndChannel, updateConfig, DEFAULT_COLOR};