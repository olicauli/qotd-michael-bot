const { EmbedBuilder } = require('discord.js');
const DEFAULT_COLOR = 0x0061ff;

// inside a command, event listener, etc.
async function sendEmbed(channel, color, content)
{
    const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setDescription(content)
return await channel.send({ embeds: [embed] });
}

function getTopicThreadTitle()
{
    let date = new Date().toLocaleDateString('en-us');
    return date.replace(/[/]/gm, '-').concat(' Question of the Day');
    //return Date.now();
}

module.exports = {sendEmbed, getTopicThreadTitle, DEFAULT_COLOR};