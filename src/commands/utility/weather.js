const embedsProvider = require("../../utilities/embedsProvider");
const {get} = require("axios");
const API_URLS = {
    current: 'https://api.weatherapi.com/v1/current.json',
};

module.exports = {
    data: {
        name: 'weather',
        description: 'Provides weather stats for a specific location',
    },
    async execute(message, args) {
        const location = args[0];
        if (location === undefined || location === '') {
            await message.reply(`\`location\` parameter is required. Example \`!weather Chisinau\`.`);
            return;
        }

        try {
            const response = await get(`${API_URLS.current}?key=${process.env.WEATHER_API_KEY}&q=${location}`);
            const status = response.status;

            if (status === 200) {
                const weatherData = response.data;
                const embeds = embedsProvider.getWeatherEmbeds(weatherData);
                await message.reply({ embeds: [embeds] });
                
            } else {
                message.reply(`Failed to fetch weather data`);
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching the weather data.');
        }
    },
};