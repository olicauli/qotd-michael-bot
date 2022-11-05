const { Events } = require('discord.js');
const { authorize } = require('../helpers/google-sheets-authorize');
const michaelMonday = require('../jobs/michaelMonday');
const postDailyTopic = require ('../jobs/postDailyTopic');

require('dotenv').config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`ready! logged in as ${client.user.tag}`);
        //console.log('in onready');
        
        michaelMonday.runMichaelMonday(client);

        let sheetsClient = await authorize();
        postDailyTopic.askQuestion(client, sheetsClient);
        //console.log(sheetsClient)
    },
};