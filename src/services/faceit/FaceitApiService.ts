import axios, {AxiosResponse} from "axios";

const API_URLS = {
    userInfo: 'https://api.faceit.com/users/v1/nicknames/',
    lifetimeStats: 'https://api.faceit.com/stats/v1/stats/users/'
};

export class FaceitApiService{
    async fetchData(url: string): Promise<any>{
        try{
            const response: AxiosResponse = await axios.get(url);
            if (response.status === 200 && response.data) return response.data;
            return null;
        }catch (error) {
            // @ts-ignore
            throw new Error(`Error while fetching data from Faceit API, error message: ${error.message}`);
        }
    }
    
    async fetchUserInfo(username: string): Promise<any | null> {
        const userData = await this.fetchData(`${API_URLS.userInfo}${username}`);
        return userData?.payload?.games?.cs2 ? userData : null;
    }

    async fetchLifeTimeStats(userId: string): Promise<any> {
        return await this.fetchData(`${API_URLS.lifetimeStats}${userId}/games/cs2`);
    }
}