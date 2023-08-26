module.exports = {
    data: {
        name: 'masya',
        description: 'Shows remaining time until you will be destroyed and humiliated by Masya (23:00)',
    },
    execute(message, args) {
        const { hours, minutes, seconds } = formatRemainingTime(getRemainingTime(23, 0, 0));
        message.reply(`Time left until you will be destroyed and humiliated by Masya: ${hours}h ${minutes}m ${seconds}s.`)
            .catch(error => console.error('Failed to reply to masya command:', error));
    },
};

function formatRemainingTime(remainingTimeInMillis) {
    const hours = Math.floor(remainingTimeInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTimeInMillis / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTimeInMillis / 1000) % 60);
    return { hours, minutes, seconds };
}

function getRemainingTime(hour, minute, second) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hour, minute, second, 0);
    return Math.max(0, targetTime - now);
}