import { CommandInteraction } from 'discord.js';

export const barkCommand = {
    data: {
        name: 'bark',
        description: 'Replies with a templated message to the bark command.',
    },
    async execute(interaction: CommandInteraction) {
        await interaction.reply(`Gaf gaf ${interaction.user.username} !!!`)
            .catch(error => console.error('Failed to reply to bark command:', error));
    },
};