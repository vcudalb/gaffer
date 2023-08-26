//const aa = require('../resources/images/author.jpg');

function getLifeTimeEmbeds(generalData, lifetimeStats){
    const fields = getLifeTimeFields(generalData, lifetimeStats);
    replaceUndefined(fields);
    const authorImagePath = __dirname;
    return {
        color: 0xFF5733,
        title: `Woof woof, here are your stats! 🐾`,
        url: `https://www.faceit.com/en/players/${generalData.payload.nickname}`,
        fields: fields,
        image: {
            url: `${generalData.payload.cover_image_url}`,
        },
        thumbnail: {
            url: generalData.payload.avatar || 'https://imgur.com/gallery/Xrq7EK6'
        },
        footer: {
            text: 'Who is the good boy? YOU!'
        },
        timestamp: new Date()
    };
}

module.exports = {
    getLifeTimeEmbeds
};

function replaceUndefined(fields) {
    fields.forEach(field => {
        if (field.value === undefined) {
            field.value = '\u200B';
        }
    });
}

function getLifeTimeFields(generalData, lifetimeStats) {
    return  [
        { name: 'ELO', value: generalData.payload.games.csgo.faceit_elo, inline: true },
        { name: 'Skill Level', value: generalData.payload.games.csgo.skill_level_label, inline: true },
        { name: 'Total Matches', value: lifetimeStats.m1, inline: true },
        { name: 'Win Rate %', value: lifetimeStats.k6, inline: true },
        { name: 'Wins', value: lifetimeStats.m2, inline: true },
        { name: 'Average K/D Ratio', value: lifetimeStats.k5, inline: true },
        { name: 'Total Headshots', value: lifetimeStats.m13, inline: true },
        { name: 'Current Win Streak', value: lifetimeStats.s1, inline: true },
        { name: 'Longest Win Streak', value: lifetimeStats.s2, inline: true },
        { name: 'Region', value: generalData.payload.games.csgo.region, inline: true },
        { name: 'Country', value: generalData.payload.country, inline: true },
        { name: 'Matching sound', value: generalData.payload.matching_sound, inline: true }
    ];
}