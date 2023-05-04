const { CommandBuilder, Message } = require("handler.djs");

module.exports = new CommandBuilder()
.setName('setLang')
.setDescription('change guild bot language')
.setUsage(['setLang (language)'])
.setExample(['setLang ar', 'setLang en'])
.setOwners(true)
.setExecution(Execute);

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) {
    const client = message.client;
    const languages = message.getData('languages');
    const database = message.getData('database');
    const Guilds = database.Guilds;
    let replys = message.meta.cmdReplys;

    let newLanguage = message[0].toLowerCase();

    if (!languages.includes(newLanguage)) return message.replyNoMention({ content: replys.notFoundLanguage(languages.join(', ')) });
    
    replys = require(`../../src/languages/${newLanguage}`)[this.name]
    await Guilds.setLanguage(message.guild.id, newLanguage);
    message.replyNoMention({ content: replys.done });
}