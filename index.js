const { Client, GatewayIntentBits, Events } = require('discord.js');
const { Application } = require('handler.djs');
const mongoose = require('mongoose');
const path = require('node:path');
const Guilds = require('./src/models/guilds.js');
const config = require('./src/config.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ]
});

new Application(client, {
    commandsPath: path.join(__dirname, 'commands'),
    validationPath: path.join(__dirname, 'validations'),
    EventsPath: path.join(__dirname, 'events'),
    owners: config.owners
});

client.Application.build();
client.Application.setData(config);
client.Application.setData({ 
    database: {Guilds}, 
    languages: (require('node:fs').readdirSync('./src/languages')).map(e => e.split('.')[0]) 
});
client.Application.setCooldown({
    message: '**{Username}**, Cool down (**{counter}** left)',
    reference: true,
    Mdelete: "4s",
    long: true,
});

mongoose.connect(process.env.db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

client.login(process.env.token);
require('./src/util.js');