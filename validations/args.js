const { Validation } = require("handler.djs");

module.exports = new Validation()
.setCommnads(['setLang'])
.setExecution(Execute);

/**
 * 
 * @param {Message} message 
 * @param {Function} next 
 * @param {Function} end 
 */


async function Execute(message, next, end) {
    if (message[0]) return next();

    const language = message.getData('language');
    const languages = message.getData('languages');
    const Guilds = message.getData('database').Guilds;
    const client = message.client;

    const guildData = await Guilds.findOne({ guildId: (message.guild) ? message.guild.id : '' });
    client.language = (guildData && guildData.language && languages.includes(guildData.language)) ? guildData.language : language;

    message.meta.cmdReplys = require(`../src/languages/${client.language}`)['help'];
    message[0] = message.Command.name;
    message.Application.getCommand('help').run(message);

    return end();
}