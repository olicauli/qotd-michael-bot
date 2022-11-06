const Settings = require('../config.json');
const Helpers = require('../helpers/helpers.js');

async function postQuestion(config, questions, channel)
{
  //if there was a previous thread, we need to archive it
  if (config.qotd.lastThread != "") 
  {
    lockAndArchiveOldThreads(channel, config.qotd.lastThread); 
  }
  if (config.qotd.rowIndex < questions.length) //if we're not at the end of the question list
  {
    config.qotd.lastThread = getThreadTitle();
    printQuestion(channel, questions, config.qotd.rowIndex++, config.qotd.lastThread);
    Helpers.updateConfig(config);
  }
  else //if it's at the end of the question list,
  {
    await channel.send({
      content: "We're at the end of the question list! Starting from the beginning."
    });
    config.qotd.rowIndex = 0;
    config.qotd.lastThread = getThreadTitle();
    printQuestion(channel, questions, config.qotd.rowIndex++, config.qotd.lastThread);
    Helpers.updateConfig(config);
  }
}

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

function getThreadTitle()
{
    let date = new Date().toLocaleDateString('en-us');
    return date.replace(/[/]/gm, '-').concat(' Question of the Day');
    //return Date.now();
}

async function createThread(message, tname)
{

    //console.log("in create thread");
    //console.log(message);
    const thread = await message.startThread({
        name: tname,
        autoArchiveDuration: 1440, //1440 minutes = 24 hours
        reason: 'Thread for answering the daily topic', });

  console.log(`created thread ${thread.name}`);
}

function schedule(day, hour, minute, second)
{
    day = validateDay(day);
    if ((hour > 24 || hour < 0) && hour != '*')
    {
        console.error("ERROR: invalid hour! using default");
        hour = 0;
    }

    if ((minute > 60 || minute < 0) && minute != '*')
    {
        console.error("ERROR: invalid minute! using default");
        minute = 0;
    }
    if ((second > 60 || second < 0) && second != '*')
    {
        console.error("ERROR: invalid second! using default");
        second = 0;
        //err
    }

    return [second, minute, hour, '*', '*', day].join(' ');
}

function validateDay(day)
{
    console.log(day);
    switch (day)
    {
        case "MON":
            break;
        case "TUE":
            break;
        case "WED":
            break;
        case "THU":
            break;
        case "FRI":
            break;
        case "SAT":
            break;
        case "SUN":
            break;
        case "*":
            break;
        default:
            if (day < 0 || day > 6)
                console.error("ERROR: invalid day! using default");
                day = "MON";
            break;
    }
    return day;
}

module.exports = { postQuestion, lockAndArchiveOldThreads, getThreadTitle, printQuestion, schedule };