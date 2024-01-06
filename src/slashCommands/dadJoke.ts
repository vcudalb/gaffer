import {SlashCommandBuilder} from 'discord.js';
import {SlashCommand} from '../../global';
import axios from 'axios';
import { EmbedsProvider } from '../core/providers/EmbedsProvider';
const embedsProvider = new EmbedsProvider();

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
                const embed = embedsProvider.getDadJokeEmbeds(data.joke);
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
