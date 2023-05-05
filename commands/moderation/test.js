const Discord = require("discord.js")

module.exports = {
  name: "test",
  description: "Pings a user to test",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "userid",
        description: "Pings you to test",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `You do not have permission to use this command!`, ephemeral: true })
    } else {
        let userid = interaction.options.getString("userid")
        interaction.reply(`<@${userid}>`)
    }
  }
}