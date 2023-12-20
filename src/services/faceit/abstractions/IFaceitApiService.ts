export interface IFaceitApiService{
    fetchUserInfo(username: string): Promise<any | null>;
    fetchLifeTimeStats(userId: string): Promise<any>;
}