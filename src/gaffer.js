require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = createClient();

client.once(Events.ClientReady, () => {
    console.log(`Client: ${client.user.tag} ready to receive messages since:${new Date().toUTCString()}!`);
});

client.on(Events.MessageCreate, function (message) {
    if (message.author.bot) return;

    if (message.content === "!bark") {
        message.reply(`Gaf gaf ${message.author.displayName} !`)
            .catch(error => console.error(`Error replying to bark ${message.content}:`, error));
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