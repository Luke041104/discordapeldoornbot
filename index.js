const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");


const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) {
    console.log("Kon geen files vinden");
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./commands/${f}`);
    console.log(`De file ${f} is geladen`)

    bot.commands.set(fileGet.help.name, fileGet);
  })


});


bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Apeldoorn Roleplay", { type: "PLAYING" });
});


bot.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.type === "dm") return;

  var prefix = botConfig.prefix;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var arguments = messageArray.slice(1);

  var commands = bot.commands.get(command.slice(prefix.length));

  if(commands) commands.run(bot, message, arguments);



 // if (command === `${prefix}test`) {

  //  return message.channel.send("Hallo");

 // }

  if (command === `${prefix}kick`) {

    //kick persoon reden.

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (kickUser) return message.channel.send("Persoon die je wilt kicken is niet op de server")

    var reason = arguments.join(" ").slice(22);

    if (message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij kan geen personen kicken")

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan jij niet kicken")

    var kick = new discord.RichEmbed()
      .setDescription("Kick")
      .setColor("#ee0000")
      .addfield("Gekickte Gebruiker", kickUser)
      .addfield("Gekickt door", message.author)
      .addfield("Reden", reason)

    var kickChannel = message.guild.find(`name`, "test");
    if (kickChannel) return message.guild.send("Kan het kanaal niet vinden");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);



    return;
  }



  if (command === `${prefix}ban`) {
    //Ban persoon reden.

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (banUser) return message.channel.send("Persoon die je wilt bannen is niet op de server")

    var reason = arguments.join(" ").slice(22);

    if (message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij kan geen personen bannen")

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze persoon kan jij niet bannen")

    var ban = new discord.RichEmbed()
      .setDescription("Ban")
      .setColor("#ee0000")
      .addfield("Verbannen Gebruiker", banUser)
      .addfield("Verbannen door", message.author)
      .addfield("Reden", reason)

    var banChannel = message.guild.find(`name`, "test");
    if (banChannel) return message.guild.send("Kan het kanaal niet vinden");

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);


    return;
  }


});




bot.login(process.env.token);