# Bot Template

## Table of Contents
[1. description](#description)

[2. to-do list](#to-do-list)

[3. install](#install)

[4. script usage](#script-usage)

[5. commands](#commands)

[6. credits](#credits)

## Description
just a set up for a discord bot with some basic commands, framework to easily add future commands/routines

## To-Do List
- make postDailyTopic store the index it last read from
- make the output prettier with embeds

## Install
1. clone the repo
2. run `npm install`
3. create a `.env` file in the root directory, set `GUILD_ID`, `CLIENT_ID`, `TOKEN`, values to dev discord server ID, the bot application ID, and the bot token respectively
4. start the bot with `npm run start`

## Script Usage
`npm run start`
- starts the discord bot

`npm run deploy [argument]` 
- `guild` argument deploys all guild commands
- `global` argument deploys all global commands

`npm run delete [argument]` 
- `guild` argument deletes all guild commands   
- `global` argument deletes all global commands

## Commands

`help`
- lists available commands

`ping`
- replies with 'pong'

`server`
- lists basic server info

`user`
- lists basic user info

## Credits
UNFINISHED; i'll add specific licenses and stuff later