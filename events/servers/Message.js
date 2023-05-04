const { Events } = require("discord.js");
const { EventBuilder, Message } = require("handler.djs");
const Guilds = require('../../src/models/guilds.js');

module.exports = new EventBuilder()
.setEvent(Events.MessageCreate)
.setExecution(Execute)

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) {

    const client = message.client;
    const language = client.Application.getData('language');

    const guildData = await Guilds.findOne({ guildId: (message.guild) ? message.guild.id : '' });
    client.language = (guildData && guildData.language && client.languages.includes(guildData.language)) ? guildData.language : language;

    client.languageJson = require('../../src/languages/' + client.language);
    client.generalReplys = client.languageJson.general;

 
    client.Application.setCooldownMessage(client.generalReplys.timeOut('{counter}'))
}