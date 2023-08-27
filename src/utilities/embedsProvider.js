const {countryCodeEmoji} = require("country-code-emoji");
const baseImagePath = `https://raw.githubusercontent.com/vcudalb/gaffer/develop/src/resources/images/`

function getLifeTimeEmbeds(generalData, lifetimeStats) {
    const fields = getLifeTimeFields(generalData, lifetimeStats);
    replaceUndefined(fields);

    const currentElo = generalData.payload.games.csgo.faceit_elo;
    const eloThresholdDetails = getEloThresholds(currentElo);
    let skillLevelPic = `${baseImagePath}level${generalData.payload.games.csgo.skill_level_label.toString()}.png`;
    return {
        color: 0xFF5500,
        author: {
            name: `ELO: ${currentElo.toString()}\n ${eloThresholdDetails}`,
            icon_url: skillLevelPic,
            url: `https://www.faceit.com/en/players/${generalData.payload.nickname}`,
        },
        url: `https://www.faceit.com/en/players/${generalData.payload.nickname}`,
        fields: fields,
        image: {
            url: generalData.payload.cover_image_url || 'https://corporate.faceit.com/wp-content/uploads/corporate-banner.jpg',
        },
        thumbnail: {
            url: generalData.payload.avatar || `${baseImagePath}saddog.png`
        },
        footer: {
            text: `Explore more commands using: !gaffer-help \n`,
            icon_url: `${baseImagePath}piosg.PNG`,
        }
    };
}

function getLifeTimeMapEmbeds(nickname, mapStats, mapName) {
    const fields = getLifeTimeMapFields(mapStats);
    replaceUndefined(fields);
    return {
        color: 0xFF5500,
        author: {
            name: `Total matches: ${mapStats.m1}`,
            icon_url: ``,
            url: `https://www.faceit.com/en/players/${nickname}/stats/csgo`,
        },
        url: `https://www.faceit.com/en/players/${nickname}/stats/csgo`,
        fields: fields,
        image: {
            url: `https://cdn.faceit.com/static/stats_assets/csgo/maps/200x125/csgo-votable-maps-${mapName}-200x125.jpg` || 'https://corporate.faceit.com/wp-content/uploads/corporate-banner.jpg',
        },
        footer: {
            text: `Explore more commands using: !gaffer-help \n`,
            icon_url: `${baseImagePath}piosg.PNG`,
        }
    };
}

function replaceUndefined(fields) {
    fields.forEach(field => {
        if (field.value === undefined) {
            field.value = '\u200B';
        }
    });
}

function getLifeTimeFields(generalData, lifetimeStats) {
    return [
        {name: 'Total Matches', value: lifetimeStats.m1, inline: true},
        {name: 'Win Rate %', value: lifetimeStats.k6, inline: true},
        {name: 'Wins', value: lifetimeStats.m2, inline: true},
        {name: 'Average K/D Ratio', value: lifetimeStats.k5, inline: true},
        {name: 'Headshots', value: lifetimeStats.m13, inline: true},
        {name: 'Current Win Streak', value: lifetimeStats.s1, inline: true},
        {name: 'Longest Win Streak', value: lifetimeStats.s2, inline: true},
        {name: 'Region', value: generalData.payload.games.csgo.region, inline: true},
        {name: 'Country', value: countryCodeEmoji(generalData.payload.country), inline: true},
        {name: 'Matching sound', value: generalData.payload.matching_sound, inline: true}
    ];
}

function getLifeTimeMapFields(mapStats){
    return [
        { name: 'Matches', value: mapStats.m1, inline: true },
        { name: 'Wins', value: mapStats.m2, inline: true },
        { name: 'Win Rate', value: `${mapStats.k6}%`, inline: true },
        { name: 'Kills', value: mapStats.m3, inline: true },
        { name: 'Deaths', value: mapStats.m4, inline: true },
        { name: 'K/D Ratio', value: mapStats.k5, inline: true },
        { name: 'Headshots', value: `${mapStats.k8}%`, inline: true },
        { name: 'Assists', value: mapStats.m5, inline: true },
        { name: 'MVPs', value: mapStats.m6, inline: true },
        { name: 'Rounds', value: mapStats.m8, inline: true },
        { name: 'Headshots', value: mapStats.m9, inline: true },
        { name: 'Triple Kills', value: mapStats.m10, inline: true },
        { name: 'Quadro Kills', value: mapStats.m11, inline: true },
        { name: 'ACEs', value: mapStats.m12, inline: true },
        { name: 'Average Kills', value: mapStats.k1, inline: true },
        { name: 'Average Deaths', value: mapStats.k2, inline: true },
        { name: 'Average Assists', value: mapStats.k3, inline: true },
        { name: 'Average MVPs', value: mapStats.k4, inline: true }
    ]
}

function getEloThresholds(currentElo) {
    const eloRanges = [
        {level: 1, min: 1, max: 800},
        {level: 2, min: 801, max: 950},
        {level: 3, min: 951, max: 1100},
        {level: 4, min: 1101, max: 1250},
        {level: 5, min: 1251, max: 1400},
        {level: 6, min: 1401, max: 1550},
        {level: 7, min: 1551, max: 1700},
        {level: 8, min: 1701, max: 1850},
        {level: 9, min: 1851, max: 2000},
        {level: 10, min: 2001, max: Infinity},
    ];

    const currentRange = eloRanges.find(range => currentElo >= range.min && currentElo <= range.max);
    if (!currentRange) {
        return "NA";
    }

    const lowerRange = currentRange.level > 1 ? eloRanges[currentRange.level - 2] : null;
    const upperRange = eloRanges[currentRange.level - 1];

    const eloToDowngrade = lowerRange ? currentElo - lowerRange.max : '-';
    const eloToUpgrade = upperRange.max - currentElo + 1;

    return `${lowerRange.max + 1}   [🔽${eloToDowngrade}]    [🔼${eloToUpgrade}]   ${upperRange.max}`;
}

module.exports = {
    getLifeTimeEmbeds,
    getLifeTimeMapEmbeds
};