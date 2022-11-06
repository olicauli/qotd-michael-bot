# QOTD Michael Bot

## Table of Contents
[1. description](#description)

[2. to-do list](#to-do-list)

[3. install](#install)

[4. script usage](#script-usage)

[5. credits](#credits)

## Description
posts daily questions . also michael monday

## To-Do List
- mark questions as read?
- shuffle questions?

## Install
1. clone the repo
2. run `npm install`
3. create a `.env` file in the root directory, set `GUILD_ID`, `CLIENT_ID`, `TOKEN`, values to dev discord server ID, the bot application ID, and the bot token respectively
4. set `GENERAL_ID` as your general channel (it posts michael monday there), and `DAILY_TOPIC_ID` for your daily questions channel (it creates daily question threads there)
5. start the bot with `npm run start`

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