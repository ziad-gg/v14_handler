const { Client, GatewayIntentBits, Events } = require('discord.js');
const { Application } = require('handler.djs');
const mongoose = require('mongoose');
const path = require('node:path');

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
});

client.Application.build();
client.Application.setData(require('./src/config'));


client.Application.setCooldown({
    message: '**{Username}**, Cool down (**{counter}** left)',
    reference: true,
    Mdelete: "4s",
    long: true,
});

mongoose.connect('', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
client.login();