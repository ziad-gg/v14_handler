const { Validation, Message } = require("handler.djs");

module.exports = new Validation()
.setCommnads("all")
.setExecution(Execute);

/**
 * 
 * @param {Message} message 
 * @param {Function} next 
 * @param {Function} end 
 */

async function Execute(message, next, end) {

    const language = message.getData('language');
    const languages = message.getData('languages');
    const Guilds = message.getData('database').Guilds;
    const client = message.client;

    const guildData = await Guilds.findOne({ guildId: (message.guild) ? message.guild.id : '' });
    client.language = (guildData && guildData.language && languages.includes(guildData.language)) ? guildData.language : language;

    client.languageJson = require('../src/languages/' + client.language);
    client.generalReplys = client.languageJson.general;

    next('cmdReplys', client.languageJson[message.cmdName]);
}