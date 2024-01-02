import {SlashCommandBuilder} from "discord.js"
import {SlashCommand} from "../../global";
import get from "axios";
import {EmbedsProvider} from "../core/providers/EmbedsProvider";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Provides weather stats for a specific location")
        .addStringOption(option => {
            return option
                .setName("location")
                .setDescription("Location for which the weather will be displayed")
                .setRequired(true)
        }) as SlashCommandBuilder,

    execute: async interaction => {
        let embedsProvider = new EmbedsProvider();
        const {commandName, options} = interaction;
        let location = options.getString('location');

        try {
            const response = await get(`${API_URLS.current}?key=${process.env.WEATHER_API_KEY}&q=${location}`);
            const status = response.status;

            if (status === 200) {
                const weatherData = response.data;
                const embeds = embedsProvider.getWeatherEmbeds(weatherData);
                await interaction.reply({embeds: [embeds]});
                await interaction.deleteReply();
            } else {
                await interaction.reply('Failed to fetch weather data'.toString());
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while fetching the weather data.'.toString());
        }
    },
    cooldown: 60
}

const API_URLS = {
    current: 'https://api.weatherapi.com/v1/current.json',
};

export default command;