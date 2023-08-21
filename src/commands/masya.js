module.exports = {
    name: 'masya',
    description: 'Shows remaining time until you will be destroyed and humiliated by Masya (23:00)',
    execute(message, args) {
        const now = new Date();
        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 0, 0);
        const remainingTimeInMillis = Math.max(0, targetTime - now);

        const hours = Math.floor(remainingTimeInMillis / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTimeInMillis % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTimeInMillis % (1000 * 60)) / 1000);

        message.reply(`Time left until you will be destroyed and humiliated by Masya: ${hours}h ${minutes}m ${seconds}s.`)
            .catch(error => console.error(`Failed to reply to masya command:`, error));
    },
};