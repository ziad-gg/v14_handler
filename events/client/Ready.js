const { Events, Client } = require("discord.js");
const { EventBuilder } = require("handler.djs");

module.exports = new EventBuilder()
.setEvent(Events.ClientReady)
.setExecution(Execute) 

/**
 * @param {Client} client 
 */

async function Execute(client) {
    const presence = client.Application.getData('presence');
    const prefix = client.Application.getData('prefix');
    
    client.Application.setPrefix(prefix);
    client.user.setPresence(presence);
    
    console.log("Registered As (%s) in (%d) Guilds ", client.user.tag, client.guilds.cache.size);
}