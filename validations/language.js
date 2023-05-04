const { Validation, Message } = require("handler.djs");
const Guilds = require('../src/models/guilds.js');

module.exports = new Validation()
.setCommnads("all")
.setExecution(Execute);

/**
 * 
 * @param {Message} message 
 * @param {Function} next 
 */

async function Execute(message, next) {

    const language = message.getData('language');
    const client = message.client;

    const guildData = await Guilds.findOne({ guildId: (message.guild) ? message.guild.id : '' });
    client.language = (guildData && guildData.language && client.languages.includes(guildData.language)) ? guildData.language : language;

    client.languageJson = require('../src/languages/' + client.language);
    client.generalReplys = client.languageJson.general;

    next('cmdReplys', client.languageJson[message.cmdName])
    
}