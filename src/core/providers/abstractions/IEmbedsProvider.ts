import {ICsGeneralData} from "../../../models/abstractions/ICsGeneralData";
import {ICsLifetimeStats} from "../../../models/abstractions/ICsLifetimeStats";
import {ICsMapStats} from "../../../models/abstractions/ICsMapStats";
import {IWeather} from "../../../models/abstractions/IWeather";

export interface IEmbedsProvider{
    getLifeTimeEmbeds(generalData: ICsGeneralData, lifetimeStats: ICsLifetimeStats) : any;
    getLifeTimeMapEmbeds(nickname: string, avatar: string, mapStats: ICsMapStats, mapName: string): any;
    getWeatherEmbeds(weather: IWeather): any;
}