//from here: https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

const { REST, Routes } = require('discord.js');
require('dotenv').config({ path: '../.env'});
const fs = require('node:fs');

let clientId = process.env.CLIENT_ID;
let guildId = process.env.GUILD_ID;
let token = process.env.TOKEN;

const clArg = process.argv.slice(2)[0];

const errChecking = require('../helpers/scriptErrChecking.js');
const checkArgs = errChecking.checkArgs;
checkArgs(clArg);

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('../commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`started refreshing ${commands.length} ${clArg} application (/) commands.`);
        let data = null;
		// The put method is used to fully refresh all commands in the guild with the current set
        if (clArg == "guild")
        {
            data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
        }
		else if (clArg == "global")
        {
            data = await rest.put(
                Routes.applicationCommands(clientId, guildId),
                { body: commands },
            );
        }

		console.log(`successfully reloaded ${data.length} ${clArg} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();