import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from 'discord.js';
// @ts-ignore
import { get } from 'axios';
// @ts-ignore
import {EmbedsProvider} from "../core/providers/EmbedsProvider";

const API_URLS = {
    current: 'https://api.weatherapi.com/v1/current.json',
};

const slashCommand = new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Provides weather stats for a specific location")
    .addStringOption(option =>
        option.setName('location')
            .setDescription('Location for which the weather will be displayed')
            .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction) {

    let embedsProvider = new EmbedsProvider();
    const { commandName, options } = interaction;
    let location = options.getString('location');

    try {
        const response = await get(`${API_URLS.current}?key=${process.env.WEATHER_API_KEY}&q=${location}`);
        const status = response.status;

        if (status === 200) {
            const weatherData = response.data;
            const embeds = embedsProvider.getWeatherEmbeds(weatherData);
            await interaction.reply({embeds: [embeds]});
        } else {
            await interaction.reply('Failed to fetch weather data');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while fetching the weather data.');
    }
}

export {slashCommand}
