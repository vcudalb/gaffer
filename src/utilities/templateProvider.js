function getFaceitUserGeneralInfo(username, userData) {
    const csgoStats = userData.payload.games.csgo;
    const faceitElo = csgoStats.faceit_elo;
    const skillLevel = csgoStats.skill_level_label;
    const createdAt = new Date(userData.payload.created_at);
    const region = csgoStats.region;
    const country = userData.payload.country;
    const matchingSound = userData.payload.matching_sound;

    return `
🎮 CS:GO Stats for \`${username}\`:
• ELO: ${faceitElo}
• Skill Level: ${skillLevel}
• Region: ${region}
• Country: ${country}
• Created at: ${createdAt}
• Matching sound: ${matchingSound}

For more detailed stats, use: \`!faceit-lastmatches ${userData.payload.id}\``;
}

module.exports = {
    getFaceitUserGeneralInfo,
};
