const { Events } = require('discord.js');
const { authorize } = require('../helpers/google-sheets');
const michaelMonday = require('../jobs/michaelMonday');
const DailyTopicJob = require ('../jobs/postDailyTopic');

require('dotenv').config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`ready! logged in as ${client.user.tag}`);
        
        michaelMonday.runMichaelMonday(client);

        let sheetsClient = await authorize();
        DailyTopicJob.postTopic(client, sheetsClient);
    },
};