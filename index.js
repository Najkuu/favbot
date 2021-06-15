const Discord = require('discord.js');
const nodemon = require('nodemon');
const { FILE } = require('dns');
const client = new Discord.Client();

const prefix = 'f?';

const fs = require('fs');
const { fileURLToPath } = require('url');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}
const mongoose = require('mongoose')
client.on('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);

  mongoose.connect('mongodb+srv://Najkuu:RY0OVZq5SUf4RFop@cluster0.nfolf.mongodb.net/favBotDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Polaczono z baza danych.');
  })
  .catch((err) => {
    console.log(err);
  })
});

// password = RY0OVZq5SUf4RFop

client.on('message', message =>{
  const wzmianka = new RegExp(`^<@!?${client.user.id}>( |)$`);
if (message.content.match(wzmianka)) {
  var embed = new Discord.MessageEmbed()
  .setColor('#58D68D')
  .setTitle('FΛV')
  .setDescription('favbot to nowy innowacyjny bot, mający na celu wybić polską topke botów mamy nadzieje ze z niego skorzystasz \nBot jest tworzony przez grono osób która stara się o estetyke bota.\n')
  .setThumbnail('https://cdn.discordapp.com/attachments/853699598420934690/854082500086071347/newlogo.png')
  .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
  .addFields(
    {name: '> <a:prefix:853252385022410772> **| Prefix bota**', value: '${guild.prefix}'}
)
  message.channel.send(embed)
}
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'pomoc'){
    client.commands.get('pomoc').execute(message, args, Discord);
  } else if (command == 'ping'){
    client.commands.get('ping').execute(message, args, client)
  } else if (command == 'warn'){
    client.commands.get('warn').execute(message, args, Discord, client)
  } else if (command == 'warnings'){
    client.commands.get('warnings').execute(message, args, Discord, client)
  }
});

client.login('ODUzNjcyMDY5ODU3MDE3ODk2.YMYyEQ.LeQUoOW2HfJ2FS-jGC6d3gSQXsw');
