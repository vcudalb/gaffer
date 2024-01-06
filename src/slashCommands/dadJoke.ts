import {SlashCommandBuilder} from 'discord.js';
import {SlashCommand} from '../../global';
import axios from 'axios';

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('dad-joke')
        .setDescription('Get a random dad joke'),

    execute: async (interaction) => {
        try {
            const response = await axios.get('https://icanhazdadjoke.com/', {
                headers: {'Accept': 'application/json'},
            });

            const {status, data} = response;

            if (status === 200) {
                const dadJoke = data.joke;

                const embed = {
                    color: 0xFFD700, // Gold color
                    title: 'Dad Joke Time',
                    description: dadJoke,
                    footer: {
                        text: 'Ba Dum Tss! 🥁',
                    },
                };

                await interaction.reply({embeds: [embed]});
            } else {
                await interaction.reply('Failed to fetch dad joke :(');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while fetching the dad joke.');
        }
    },
    cooldown: 5,
};

export default command;
