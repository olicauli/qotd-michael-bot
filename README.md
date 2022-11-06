# QOTD Michael Bot

## Table of Contents
[1. description](#description)

[2. to-do list](#to-do-list)

[3. install](#install)

[4. config](#install)

[5. script usage](#script-usage)

[6. credits](#credits)

## Description
posts daily questions . also michael monday. edit settings for the bot in `config.json`

## To-Do List
- mark questions as read?
- shuffle questions?
- `set-question` command that lets you change which row it will ask next
- `ask-question` command that manually prints out the question (in case the schedule fails)
- `change-schedule` command that lets you change when the bot asks questions, or when on mondays it posts me and michael
- `ping`  command to check if the bot is responsive
- make a `config.json` where question schedule, channels it posts in, etc are more intuitively configurable

## Install
1. clone the repo
2. run `npm install`
3. create a `.env` file in the root directory, set `GUILD_ID`, `CLIENT_ID`, `TOKEN`, values to dev discord server ID, the bot application ID, and the bot token respectively
4. set `GENERAL_ID` as your general channel (it posts michael monday there), and `DAILY_TOPIC_ID` for your daily questions channel (it creates daily question threads there)
5. start the bot with `npm run start`

## Config
`config.json` contains the following options:

- `guild`: specifies what guild it will post in. accepts a guild ID
- `channels`: the channels it will post michael monday and the daily questions in respectively. accepts channel IDs
- `qotd`: the settings for when it will post the qotd.
    - `rowIndex` is the last row it read from the google spreadsheet. updates each time it posts a question. accepts integer values
    - `lastThread` is the name of the last thread it opened. updates each time it posts a question. accepts Snowflake thread ID
    - `day`, `hour`, `minute`, `second` are what day of the week, hour, minute, and second it will post a question on, respectively. see [nodejs cron notation](https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples) for acceptable values
    - `archives`: whether the bot will archive an old thread. accepts boolean values (true or false)
    - `locks`: whether the bot will lock an old thread. accepts boolean values (true or false)

## Script Usage
`npm run start`
- starts the discord bot

`npm run deploy [argument]` 
- `guild` argument deploys all guild commands
- `global` argument deploys all global commands
- unused since we have no commands

`npm run delete [argument]` 
- `guild` argument deletes all guild commands   
- `global` argument deletes all global commands
- unused since we have no commands

## Credits
cam, oli, chase

uses the discordjs framework

google sheets quickstart from here: https://developers.google.com/sheets/api/quickstart/nodejs