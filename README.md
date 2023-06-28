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

IF `config.json` IS EMPTY, IT CRASHES. just dont do it. dont leave config empty.

## To-Do List
- mark questions as read?
- shuffle questions?

## Install
1. clone the repo
2. run `npm install`
3. create a `.env` file in the root directory, set `CLIENT_ID`, `TOKEN`, values to the bot application ID and the bot token respectively
4. set up `config.json`:
    - set `guild`, `daily-question-channel`, and `michael-monday-channel` to the appropriate guild and channel IDs
    - set `sheet`'s `id` value to the google sheet you want the bot to read questions from. NOTE: it will read values from column A2 to the end of A, so put questions in these cells. see [config](#config) for more information on what sheet id is.
    - `qotd` can be ignored on initial set up. see [config](#config) for more information on it
5. start the bot with `npm run start`
    - if this is your first time running the bot, you will likely have to log in with your google account to authorize it. the terminal will prompt you.
6. if you want to use the bot's slash commands, make sure to run `npm run deploy guild` or `npm run deploy global` to deploy the commands

## Config
`config.json` contains the following options:

- `guild`: specifies what guild it will post in. accepts a guild ID
- `channels`: the channels it will post michael monday and the daily questions in respectively. accepts channel IDs
- `sheet`: settings for the google sheet it reads from. 
    - `id` is the ID of the google sheet, found in the URL like this: https://docs.google.com/spreadsheets/d/ID_NUMBER/edit
- `qotd`: the settings for when it will post the qotd.
    - `rowIndex` is the last row it read from the google spreadsheet. updates each time it posts a question. accepts integer values
    - `lastThread` is the name of the last thread it opened. updates each time it posts a question. accepts Snowflake thread ID
    - `day`, `hour`, `minute`, `second` are what day of the week, hour, minute, and second it will post a question on, respectively. see [nodejs cron notation](https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples) for acceptable values
    - `archives`: whether the bot will archive an old QOTD thread. accepts boolean values (true or false)
    - `locks`: whether the bot will lock an old QOTD thread. accepts boolean values (true or false)

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

uses the discordjs framework and snippets of code from discordjs's guide on making a discord bot. discordjs's guide is under an MIT license, and is included in this repo as LICENSE.txt.

google sheets quickstart from here: https://developers.google.com/sheets/api/quickstart/nodejs

the google sheets quickstart code is distributed under the apache license: https://www.apache.org/licenses/LICENSE-2.0

if there's any other work that is not properly credited in here, please let me know! i have the upid memory
