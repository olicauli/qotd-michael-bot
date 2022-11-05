//dependencies
require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.TOKEN;
//const guild = process.env.GUILD_ID;

const botClient = new Client({intents: [GatewayIntentBits.Guilds]});

botClient.once(Events.ClientReady, c => {
    console.log(`ready! logged in as ${c.user.tag}`);
});

botClient.login(token);