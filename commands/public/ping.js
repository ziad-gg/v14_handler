const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");

module.exports = new CommandBuilder()
.setName('ping')
.setDescription('Test bot ws Response')
.setCooldown("5s")
.setExecution(Execute)

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) {

    const client = message.client;
    const replys = message.meta.cmdReplys;
    const Color = message.Application.getData('embedColor');
    
    let now_time = Date.now();
    let msg = await message.replyNoMention({ content: replys.pong });

    let embed = new EmbedBuilder()
    .setColor(Color)
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**📊 Time Taken: ${Date.now() - now_time} ms\n🌐 Web Socket: ${client.ws.ping} ms**`);
    
    await msg.edit({ content: '',  embeds: [embed] });

}