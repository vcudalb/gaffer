const faceitService = require("../../services/faceit/faceitService");
const embedsProvider = require("../../utilities/embedsProvider");
const {get} = require("axios");

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
            const response = await get(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`
            );

            const status = response.status;

            if (status === 200) {
                const weatherData = response.data;
                const weatherDescription = weatherData.current.condition.text;
                const temperature = weatherData.current.temp_c;
                const city = weatherData.location.name;
                const country = weatherData.location.country;

                const embeds = {
                    color: 0x0099ff,
                    title: `Weather in ${city}, ${country}`,
                    fields: [
                        {
                            name: 'Description',
                            value: weatherDescription,
                        },
                        {
                            name: 'Temperature',
                            value: `${temperature}°C`,
                        },
                    ],
                    timestamp: new Date(),
                };

                await message.reply({ embeds: [embeds] });
                
            } else {
                message.reply(`Failed to fetch weather data. Status code: ${status}`);
            }
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while fetching the weather data.');
        }
    },
};