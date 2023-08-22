const {EmbedBuilder} = require('discord.js');

function getFaceitUserGeneralInfo(username, userData) {
    const csgoStats = userData.payload.games.csgo;
    const faceitElo = csgoStats.faceit_elo;
    const skillLevel = csgoStats.skill_level_label;
    const createdAt = new Date(userData.payload.created_at);
    const region = csgoStats.region;
    const country = userData.payload.country;
    const matchingSound = userData.payload.matching_sound;
    const avatar = userData.payload.avatar;


    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Faceit CS:GO Stats')
        .setDescription(`CS:GO general stats for the user ${username}`)
        .setThumbnail(avatar)
        .setAuthor()
        // .addFields(
        //     {name: 'ELO', value: faceitElo, inline: true},
        //     {name: 'Skill Level', value: skillLevel, inline: true},
        //     {name: 'Region', value: region, inline: true},
        //     {name: 'Country', value: country, inline: true},
        //     {name: 'Created at', value: createdAt.toISOString(), inline: true},
        //     {name: 'Matching Sound', value: matchingSound, inline: true},
        //     {name: '\u200B', value: '\u200B'}, // Empty field
        //     {name: 'For more detailed stats', value: `Use \`!faceit-lastmatches ${userData.payload.id}\``}
        // )
        .setTimestamp();
}

module.exports = {
    getFaceitUserGeneralInfo,
};
