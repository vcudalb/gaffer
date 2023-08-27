module.exports = {
    getLifeTimeEmbeds
};

function getLifeTimeEmbeds(generalData, lifetimeStats) {
    const fields = getLifeTimeFields(generalData, lifetimeStats);
    replaceUndefined(fields);

    const currentElo = generalData.payload.games.csgo.faceit_elo;
    const eloThresholdDetails = getEloThresholds(currentElo);
    let skillLevelPic = `https://raw.githubusercontent.com/vcudalb/gaffer/c6d6e3282895be479e8f7f3c7e49970bfdeb803f/src/resources/images/level${generalData.payload.games.csgo.skill_level_label.toString()}.png`;
    return {
        color: 0xFF5500,
        title: `Woof woof, here are your stats! 🐾`,
        author: {
            name: `ELO: ${currentElo.toString()}\n ${eloThresholdDetails}`,
            icon_url: skillLevelPic,
            url: 'https://discord.js.org',
        },
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
        {name: 'Total Headshots', value: lifetimeStats.m13, inline: true},
        {name: 'Current Win Streak', value: lifetimeStats.s1, inline: true},
        {name: 'Longest Win Streak', value: lifetimeStats.s2, inline: true},
        {name: 'Region', value: generalData.payload.games.csgo.region, inline: true},
        {name: 'Country', value: generalData.payload.country, inline: true},
        {name: 'Matching sound', value: generalData.payload.matching_sound, inline: true}
    ];
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

