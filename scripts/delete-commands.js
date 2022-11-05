//code taken from here: https://stackoverflow.com/questions/69171432/how-to-delete-slash-commands-in-discord-js-v13?rq=1
require('dotenv').config({ path: '../.env' });
const { REST, Routes } = require('discord.js');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const clArg = process.argv.slice(2)[0];

const errChecking = require('../helpers/scriptErrChecking.js');
const checkArgs = errChecking.checkArgs;

checkArgs(clArg);
    
console.log(`deleting ${clArg} commands...`);
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            let deleteUrl = null;
            if (clArg == 'guild')
            {
                deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
            }
            else
            {
                deleteUrl = `${Routes.applicationCommands(clientId, guildId)}/${command.id}`;
            }
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
console.log("deleted!");