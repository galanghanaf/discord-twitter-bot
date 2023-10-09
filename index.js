require("dotenv").config({ path: __dirname + "/.env" });
const { Client, GatewayIntentBits } = require("discord.js");
const { twitterClient } = require("./twitter.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function twitter(message) {
  try {
    await twitterClient.v2.tweet(message);
  } catch (e) {
    console.log(e);
  }
}

client.on("messageCreate", (message) => {
  // menampilkan pesan yang ditulis user di channel discord
  //   console.log(message.content);

  // menampilkan detail data dari pesan yang ditulis user di channel discord
  //   console.log(message);

  //   code ini berfungsi agar ketika user menulis pesan pada channel discord, tidak dibalas berulang kali
  //   if (message.author.bot) return;

  if (message.content.match("sepuh") || message.content.match("puh")) {
    // const tweet = message.content.split("sepuh")[1];
    return message.reply({
      content: "https://i.imgur.com/Hb5JTiJ.jpg",
    });
  }

  if (message.content.startsWith("!tweet ")) {
    const tweet = message.content.split("!tweet ")[1];
    twitter(tweet);
    return message.reply({
      content: "https://i.imgur.com/YmNbwXK.gif",
    });
  }
});

client.on("interactionCreate", (interaction) => {
  //   console.log(interaction);
  interaction.reply("https://i.imgur.com/evsuzMD.gif");
});

client.login(process.env.DISCORD_BOT_TOKEN);
