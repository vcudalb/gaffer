import { CommandInteraction } from 'discord.js';
// @ts-ignore
import { get } from 'axios';
import {EmbedsProvider} from "../../core/providers/EmbedsProvider";

const API_URLS = {
    current: 'https://api.weatherapi.com/v1/current.json',
};

export const weather = {
    data: {
        name: 'weather',
        description: 'Provides weather stats for a specific location',
        options: [
            {
                name: 'location',
                description: 'The location for which you want to get the weather',
                type: 'STRING',
                required: true,
            },
        ],
    },
    async execute(interaction: CommandInteraction): Promise<void> {
        
        var embedsProvider = new EmbedsProvider();
        const location = "";//interaction.options.get('location').value as string;

        if (!location) {
            await interaction.reply('`location` parameter is required. Example `/weather Chisinau`.');
            return;
        }

        try {
            const response = await get(`${API_URLS.current}?key=${process.env.WEATHER_API_KEY}&q=${location}`);
            const status = response.status;

            if (status === 200) {
                const weatherData = response.data;
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
};
