const express = require('express')
const app = express()

app.listen(() => console.log("Reven Start"));
app.use('/ping', (req, res) => {
  res.send(new Date());
});

require("dotenv").config();
const fs = require("fs");
let Discord = require(`discord.js`)
const { Collection, Client } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.queue = new Map()

client.config = {
  prefix: "ho"
}

client.on(`ready` , async() => {
console.log(`Logged in as ${client.user.username} | ${client.user.id}
My prefix is ${client.config.prefix}`);
await client.user.setStatus('dnd')
await client.user.setActivity("Type " + client.config.prefix + "help", {type: "WATCHING"})
})



fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});



fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});


setInterval(async () => {
    const channel = client.channels.cache.get
  ("861220690769739806");
  if (!channel) return;
  let queueConstruct = []
    queueConstruct.connection = await channel.join();
      await queueConstruct.connection.voice.setSelfDeaf(true);
}, 1000);




client.login(process.env.TOKEN)
