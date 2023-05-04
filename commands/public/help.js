const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");


module.exports = new CommandBuilder()
.setName('help')
.setDescription('Get all Commands or Command Details')
.setCooldown('10s')
.setCategory('help')
.setExecution(Execute);

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) {

    const client = message.client;
    const replys = message.meta.cmdReplys;
    const Color = message.Application.getData('embedColor');
    const cmd = message[0]?.toLowerCase();

    let embed = new EmbedBuilder()
    .setFooter({ text: replys.ghFooter(client.Application.prefix) }) 
    .setColor(Color);

    if (cmd) {
      const fields = [];
      const command = client.Application.getCommand(cmd)
      if (!command || command.category == "help" || command.category == "dev" || command.category == "util") return message.reply(replys.chNotFound);

      const cmdInfo = client.languageJson[command.name.toLowerCase()]?.info || command;

      embed.setTitle(replys.chTitle(command.name)); 
    //   embed.setFooter({text: replys.chFooter});
      
      if (cmdInfo.description) embed.setDescription(cmdInfo.description);
      if (command.usage) fields.push({name: replys.chSections[1], value: command.usage.map(e => `${client.Application.prefix}${e}`).join(`\n`)});
      if (command.examples) fields.push({name: replys.chSections[2], value: command.examples.map(e => `${client.Application.prefix}${e.replace(/\{userMention}/g, `<@${message.author.id}>`).replace(/\{userId}/g, `${message.author.id}`)}`).join(`\n`)});
      //embed.addField(`**Cooldown:**`, `${(command.cooldown) ? command.cooldown : 3} second(s)`);;
        
      embed.data.fields = fields;


    } else {
        let commands = [];
        let fields = [];
      
        client.Application.commands.filter(e => e.category != 'help' || e.category != 'util' ).forEach(cmd => {
          commands.push({ name: `\`${client.Application.prefix}${cmd.name}\``, category: cmd.category });
        });
        
        let general = commands.filter(cmd => cmd.category == 'public').map(cmd => cmd.name);
        let moderator = commands.filter(cmd => cmd.category == 'moderator').map(cmd => cmd.name);
        
        embed.setTitle(replys.ghTitle);

        if (general.length) fields.push({name: replys.ghSections[0], value: general.join(', ')});
        if (moderator.length) fields.push({name: replys.ghSections[1], value: moderator.join(', ')});

        embed.data.fields = fields;

    };

    message.replyNoMention({embeds: [embed]})
}