//dependencies
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const token = process.env.TOKEN;
//const guild = process.env.GUILD_ID;

const client = new Client({intents: [GatewayIntentBits.Guilds]});

//create a commands property that contains all the commands this bot has
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property`);
	}
}

client.once(Events.ClientReady, c => {
    console.log(`ready! logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; //if it's not a slash command, return
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command)
    {
        console.error(`no command matching ${interaction.commandName} was found`);
        return;
    }
    try 
    {
        await command.execute(interaction);
    } catch(error)
    {
        console.error(error);
        await interaction.reply({ content: "there was an error. oopsie", ephemeral: true});
    }
	console.log(`${interaction.commandName} executed!`);
});

client.login(token);