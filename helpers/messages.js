const { EmbedBuilder } = require('discord.js');
const DEFAULT_COLOR = 0x0061ff;

async function sendEmbed(channel, color, content)
{
    const embed = new EmbedBuilder()
	.setColor(color)
	.setDescription(content)
return await channel.send({ embeds: [embed] });
}

async function feedback(interaction, content)
{
    return await interaction.editReply({ content: content, ephemeral: true})
}

module.exports = {DEFAULT_COLOR, sendEmbed, feedback}