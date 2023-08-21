module.exports = {
    name: 'bark',
    description: 'Replies with a templated message to the bark command.',
    execute(message, args) {
        message.reply(`Gaf gaf ${message.author.displayName} !!!`)
            .catch(error => console.error(`Failed to reply to bark command:`, error));
    },
};