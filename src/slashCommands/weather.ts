import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../global';
import axios from 'axios';
import { EmbedsProvider } from '../core/providers/EmbedsProvider';

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Provides weather stats for a specific location')
        .addStringOption((option) =>
            option
                .setName('location')
                .setDescription('Location for which the weather will be displayed')
                .setRequired(true)
        ) as SlashCommandBuilder,

    execute: async (interaction) => {
        const embedsProvider = new EmbedsProvider();
        const location = interaction.options.getString('location');

        try {
            const response = await axios.get(`${API_URLS.current}?key=${process.env.WEATHER_API_KEY}&q=${location}`);
            const { status, data: weatherData } = response;

            if (status === 200) {
                const embeds = embedsProvider.getWeatherEmbeds(weatherData);
                await interaction.reply({ embeds: [embeds] });
            } else {
                await interaction.reply('Failed to fetch weather data');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while fetching the weather data.');
        }
    },
    cooldown: 5,
};

const API_URLS = {
    current: 'https://api.weatherapi.com/v1/current.json',
};

export default command;
