module.exports = {
    data: {
        name: 'dota',
        description: 'Fetches CS:GO lifetime stats for provided user',
        options: [
            {
                name: 'username',
                description: 'The Faceit username to fetch stats for',
                type: 'STRING',
                required: true,
            },
        ],
    },
    async execute(message, args) {
        const axios = require('axios');
        const cheerio = require('cheerio');

        const url = 'https://www.dotabuff.com/players/122156576';

        axios.get(url)
            .then(response => {
                const $ = cheerio.load(response.data);

                const heroData = [];

                $('.r-table .r-row').each((index, element) => {
                    const heroElement = $(element);
                    if (index < 10) {
                        const hero = heroElement.find('.image-container-icon img').attr('title');
                        const matches = heroElement.find('.r-line-graph:eq(0) .r-body').text().trim();
                        const winPercentage = heroElement.find('.r-line-graph:eq(1) .r-body').text().trim();
                        const kda = heroElement.find('.r-line-graph:eq(2) .r-body').text().trim();
                        const role = heroElement.find('.r-role-graph .primary-role-text').text().trim();
                        const lane = heroElement.find('.r-lane-graph .primary-lane-text').text().trim();

                        heroData.push({
                            Hero: hero,
                            Matches: matches,
                            "Win %": winPercentage,
                            KDA: kda,
                            Role: role,
                            Lane: lane,
                        });
                    }
                });

                console.log(heroData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    },
};