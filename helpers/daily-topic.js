const Settings = require('../config.json');
const Sheets = require('../helpers/google-sheets');
const fs = require('fs');

function lockAndArchiveOldThreads(channel, tName)
{
  //if we've set it so the bot doesn't lock or archive anything,
  //just exit
  if (!Settings.qotd.locks && !Settings.qotd.archives) {return 0}

  //if not, look for all the threads with the given name
  const threads = channel.threads.cache.filter(x => x.name == tName);
  if (threads.length != 0)
  {
    //multiple threads can have the same name; this closes
    //and archives all that have the same name
    //const threads = channel.threads.cache.filter(x => x.name == row.lastThread);
    threads.forEach(async thread => {
      if (!thread.locked && !thread.archived)
      {
        if (Settings.qotd.locks)
          await thread.setLocked(true).catch(console.error);
        if (Settings.qotd.archives)
          await thread.setArchived(true).catch(console.error);
      }
    });
  }
}

async function printQuestion(channel, twoDArr, index, tname)
{
  const message = await channel.send({
    content: `${twoDArr[index][0]}`
  });
  createThread(message, tname);
}

function writeToFile(data)
{
  fs.writeFile('./data/row-index.json', JSON.stringify(data), function(err)
  {
    if (err) {
      console.log(err);
    }
  });
}

function getThreadTitle()
{
    let date = new Date().toLocaleDateString('en-us');
    return date.replace(/[/]/gm, '-').concat(' Question of the Day');
    //return Date.now();
}

async function createThread(message, tname)
{
  //console.log(message);
  const thread = await message.startThread({
    name: tname,
    autoArchiveDuration: 1440, //1440 minutes = 24 hours
    reason: 'Thread for answering the daily topic',
  });

  console.log(`created thread ${thread.name}`);
}

module.exports = { lockAndArchiveOldThreads, writeToFile, getThreadTitle, printQuestion };