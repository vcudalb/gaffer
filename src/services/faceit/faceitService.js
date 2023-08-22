const axios = require('axios');
const USER_INFO_API_URL = 'https://api.faceit.com/users/v1/nicknames/';
const LAST_MATCHES_API_URL = 'https://api.faceit.com/stats/v1/stats/time/users/';

async function fetchUserInfo(username) {
    try {
        const response = await axios.get(`${USER_INFO_API_URL}${username}`);
        if (response.status !== 200 || response.data === undefined) return null;

        const userData = response.data;
        if (!userData.payload?.games?.csgo) return null;

        return userData;
    } catch (error) {
        throw new Error(`Error while fetching data from Faceit API, error message: ${error.message}`);
    }
}

async function fetchLastMatchesStats(userId) {
    try {
        const response = await axios.get(`${LAST_MATCHES_API_URL}${userId}/games/csgo`);
        if (response.status !== 200 || response.data === undefined) return null;


        const lastMatchesStats = response.data;
        const matchHistory = lastMatchesStats.segments[1].stats;

        const last5Matches = matchHistory.filter((match, index) => index < 5);

        let formattedMatches = `CS:GO Last 5 Matches Stats for ${userId}:\n`;
        for (let i = 0; i < last5Matches.length; i++) {
            const matchNumber = i + 1;
            const kdaRatio = last5Matches[i].KDA.text;
            const mapName = last5Matches[i].Map.text;
            const score = last5Matches[i].Score.text;
            const matchOutcome = last5Matches[i].Outcome.text;

            // Determine color based on match outcome (win or lose)
            const outcomeColor = matchOutcome === 'Win' ? '🟢' : '🔴';

            formattedMatches += `${matchNumber}. KDA: ${kdaRatio}, Map: ${mapName}, Score: ${score}, ${outcomeColor} ${matchOutcome}\n`;
        }

        return formattedMatches;
    } catch (error) {
        throw new Error(`Error while fetching last matches stats from Faceit API, error message: ${error.message}`);
    }
}

module.exports = {
    fetchUserInfo,
    fetchLastMatchesStats
};