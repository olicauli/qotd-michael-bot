//code from here: https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files
const fs = require('node:fs');
const path = require('node:path');

function handleEvent(client)
{
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) 
    {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

module.exports = { handleEvent };