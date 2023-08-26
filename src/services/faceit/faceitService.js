const axios = require('axios');
const USER_INFO_API_URL = 'https://api.faceit.com/users/v1/nicknames/';
const USER_LIFETIME_INFO_API_URL = 'https://api.faceit.com/stats/v1/stats/users/';

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

async function fetchLifeTimeStats(userId) {
    try {
        const response = await axios.get(`${USER_LIFETIME_INFO_API_URL}${userId}/games/csgo`);
        if (response.status !== 200 || response.data === undefined) return null;

        return response.data;
        } 
        catch (error) {
        throw new Error(`Error while fetching lifetime stats from Faceit API, error message: ${error.message}`);
    }
}

module.exports = {
    fetchUserInfo,
    fetchLifeTimeStats
};