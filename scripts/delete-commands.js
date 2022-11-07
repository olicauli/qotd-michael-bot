//code taken from here: https://stackoverflow.com/questions/69171432/how-to-delete-slash-commands-in-discord-js-v13?rq=1
require('dotenv').config({ path: '../.env' });
const { REST, Routes } = require('discord.js');
const Settings = require('../config.json');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = Settings.guild;

const clArg = process.argv.slice(2)[0];

const errChecking = require('../helpers/scriptErrChecking.js');
const checkArgs = errChecking.checkArgs;

checkArgs(clArg);
    
console.log(`deleting ${clArg} commands...`);
const rest = new REST({ version: '9' }).setToken(token);
let commandsRoute;
if (clArg == 'guild')
    commandsRoute == Routes.applicationGuildCommands(clientId, guildId);
else
    commandsRoute == Routes.applicationCommands(clientId);
rest.get(commandsRoute)
    .then(data => {
        const promises = [];
        for (const command of data) {
            let deleteUrl = null;
            deleteUrl = `${commandsRoute}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
console.log("deleted!");