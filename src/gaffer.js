require('dotenv').config();
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const prefix = '!';
const fs = require('fs');
const path = require("path");
const client = createClient();

client.once(Events.ClientReady, () => {
    console.log(`Client: ${client.user.tag} ready to receive messages since:${new Date().toUTCString()}!`);
});

setClientCommands(client);

client.on(Events.MessageCreate, function (message) {
    if(!isValidMessage(message)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) {
        return;
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('An error occurred while trying to execute that command.');
    }
});

client.login(process.env.CLIENT_TOKEN).then(r => console.log(`Client: ${client.user.tag} successfully logged at:${new Date().toUTCString()}`));

function createClient(){
    return new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ]
    });
}

function setClientCommands(client)
{
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('execute' in command) {
            client.commands.set(command.name, command);
        } else {
            console.warn(`The command at ${filePath} is missing required "execute" property.`);
        }
    }
}

function isValidMessage(message){
    return !(!message.content.startsWith(prefix) || message.author.bot);
}