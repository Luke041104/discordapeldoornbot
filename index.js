const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

console.log(`${bot.user.username} is online!`);

bot.user.setActivity("Apeldoorn Roleplay", {type: "PLAYING"});
});


bot.on("message", async message => {

  if(message.author.bot) return;

  if(message.channel.type === "dm") return;

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var arguments = messageArray.slice(1);

  if(command ===  `${prefix}hallo`){

    return message.channel.send("Hallo");

  }

if(command === `${prefix}kick`){

//kick persoon reden.

var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

if(kickUser) return message.channel.send("Persoon die je wilt kicken is niet op de server")

var reason = arguments.join(" ").slice(22);

if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij kan geen personen kicken")

if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan jij niet kicken")

var kick = new discord.RichEmbed()
.setDescription("Kick")
.setColor("#ee0000")
.addfield("Kicked Gebruiker", kickUser)
.addfield("Gekickt door", message.author)
.addfield("Reden", reason)

var kickChannel = message.guild.find(`name`, "test");
if (kickChannel) return message.guild.send("Kan het kanaal niet vinden");

message.guild.member(kickUser).kick(reason);

kickChannel.send(kick);



  return;
}



});




bot.login(process.env.token);