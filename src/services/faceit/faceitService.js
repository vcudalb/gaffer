const axios = require('axios');

const API_URLS = {
    userInfo: 'https://api.faceit.com/users/v1/nicknames/',
    lifetimeStats: 'https://api.faceit.com/stats/v1/stats/users/'
};

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        throw new Error(`Error while fetching data from Faceit API, error message: ${error.message}`);
    }
}

async function fetchUserInfo(username) {
    const userData = await fetchData(`${API_URLS.userInfo}${username}`);
    return userData?.payload?.games?.csgo ? userData : null;
}

async function fetchLifeTimeStats(userId) {
    return await fetchData(`${API_URLS.lifetimeStats}${userId}/games/csgo`);
}

module.exports = {
    fetchUserInfo,
    fetchLifeTimeStats
};