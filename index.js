const { Client, Discord, InteractionType, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require("./config.json");
const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds
  ]
})

module.exports = client

client.on('interactionCreate', (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName)
    if (!cmd) return interaction.reply(`Error`)
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id)
    cmd.run(client, interaction)
  }
});

client.on('ready', () => {
  console.log(`🔵 Im Online at ${client.user.username}!`)
  
  client.user.setPresence({
    activities: [
      { name: `moderator music`, type: ActivityType.Listening },
   
  ],
    status: 'online',
  });
})


client.on('error', (error) => {
  console.error('Error:', error)
})

client.on('warn', (warning) => {
  console.warn('Warning:', warning)
})



client.slashCommands = new Collection()
require('./handler')(client)
client.login(config.token)
