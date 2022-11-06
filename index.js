require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({intents: [GatewayIntentBits.Guilds]});

//import handlers
const commandHandler = require('./helpers/command-handler.js');
const eventHandler = require('./helpers/event-handler.js');

eventHandler.handleEvent(client);
commandHandler.handleCommand(client);

client.login(token);