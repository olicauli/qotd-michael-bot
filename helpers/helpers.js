const { EmbedBuilder } = require('discord.js');
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

module.exports = {sendEmbed, checkGuildAndChannel, DEFAULT_COLOR};