import {countryCodeEmoji} from "country-code-emoji";
import {eloRanges} from "../utilities/EloConstants";
import {IWeather} from "../../models/abstractions/IWeather";
import {ICsGeneralData} from "../../models/abstractions/ICsGeneralData";
import {ICsLifetimeStats} from "../../models/abstractions/ICsLifetimeStats";
import {ICsMapStats} from "../../models/abstractions/ICsMapStats";
import {IEmbedsProvider} from "./abstractions/IEmbedsProvider";

const baseImagePath = `https://raw.githubusercontent.com/vcudalb/gaffer/develop/src/resources/images/`;

export class EmbedsProvider implements IEmbedsProvider {
    public getLifeTimeEmbeds(generalData: ICsGeneralData, lifetimeStats: ICsLifetimeStats): any {
        const fields = this.getLifeTimeFields(generalData, lifetimeStats);
        this.replaceUndefined(fields);

        const currentElo = generalData.payload.games.cs2.faceit_elo;
        const eloThresholdDetails = this.getEloThresholds(currentElo);
        let skillLevelPic = `${baseImagePath}level${generalData.payload.games.cs2.skill_level_label.toString()}.png`;
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

    public getLifeTimeMapEmbeds(nickname: string, avatar: string, mapStats: ICsMapStats, mapName: string): any {
        const fields = this.getLifeTimeMapFields(mapStats);
        this.replaceUndefined(fields);
        return {
            color: 0xFF5500,
            author: {
                name: `Total matches: ${mapStats.m1}`,
                icon_url: avatar || `${baseImagePath}${mapName}.jpg`,
                url: `https://www.faceit.com/en/players/${nickname}/stats/cs2`,
            },
            url: `https://www.faceit.com/en/players/${nickname}/stats/cs2`,
            fields: fields,
            image: {
                url: `${baseImagePath}${mapName}.jpg` || 'https://corporate.faceit.com/wp-content/uploads/corporate-banner.jpg',
            },
            footer: {
                text: `Explore more commands using: !gaffer-help \n`,
                icon_url: `${baseImagePath}piosg.PNG`,
            }
        };
    }

    public getWeatherEmbeds(weather: IWeather): any {
        const fields = this.getWeatherFields(weather);
        this.replaceUndefined(fields);

        return {
            color: 0x0099FF,
            author: {
                name: `${weather.current.condition.text} in ${weather.location.name}, ${weather.location.country}`,
                icon_url: `https:${weather.current.condition.icon}`,
                url: 'https://www.weatherapi.com/weather/',
            },
            fields: fields,
            footer: {
                text: `Explore more commands using: !gaffer-help \n`,
                icon_url: `${baseImagePath}piosg.PNG`,
            }
        };
    }

    public getDadJokeEmbeds(dadJoke: string) {
        return {
            color: 0xFFD700,
            author: {
                name: `Dad Jokes`,
                icon_url: `${baseImagePath}dad-joke.png`,
                url: 'https://icanhazdadjoke.com/',
            },
            url: 'https://icanhazdadjoke.com/',
            title: dadJoke,
            footer: {
                text: '',
            },
            text: `Ba Dum Tss! 🥁 \n Explore more commands using: !gaffer-help \n`,
            icon_url: `${baseImagePath}piosg.PNG`,
        };
    }

    private replaceUndefined(fields: any[]): void {
        fields.forEach(field => {
            if (field.value === undefined) {
                field.value = '\u200B';
            }
        });
    }

    private getWeatherFields = (weather: IWeather) => {
        let feelsLike = weather.current.feelslike_c.toString();
        let humidity = weather.current.humidity.toString();
        let windKph = weather.current.wind_kph.toString();
        let tempC = weather.current.temp_c.toString();

        return [
            {name: 'Temperature 🌡️', value: `${tempC} °C`, inline: true},
            {name: 'Feels like', value: `${feelsLike} °C`, inline: true},
            {name: 'Humidity', value: `${humidity}%`},
            {name: 'Wind Speed 🌬️', value: `${windKph} kp/h`, inline: true},
            {name: 'Wind Direction', value: weather.current.wind_dir, inline: true},
        ];
    };

    private getLifeTimeFields = (generalData: ICsGeneralData, lifetimeStats: ICsLifetimeStats) => [
        {name: 'Total Matches', value: lifetimeStats.m1, inline: true},
        {name: 'Win Rate', value: `${lifetimeStats.k6}%`, inline: true},
        {name: 'Wins 🏆', value: lifetimeStats.m2, inline: true},
        {name: 'Average K/D Ratio', value: lifetimeStats.k5, inline: true},
        {name: 'Headshots 🤯', value: lifetimeStats.m13, inline: true},
        {name: 'Current Win Streak ↗️', value: lifetimeStats.s1, inline: true},
        {name: 'Longest Win Streak 🔝', value: lifetimeStats.s2, inline: true},
        {name: 'Region', value: generalData.payload.games.cs2.region, inline: true},
        {name: 'Country', value: countryCodeEmoji(generalData.payload.country), inline: true},
        {name: 'Matching sound', value: generalData.payload.matching_sound, inline: true}
    ];

    private getLifeTimeMapFields = (mapStats: ICsMapStats) => [
        {name: 'Wins 🏆', value: mapStats.m2, inline: true},
        {name: 'Win Rate', value: `${mapStats.k6}%`, inline: true},
        {name: 'Kills 🔫', value: mapStats.m3, inline: true},
        {name: 'Deaths ☠️', value: mapStats.m4, inline: true},
        {name: 'K/D Ratio', value: mapStats.k5, inline: true},
        {name: 'Headshots 🤯', value: `${mapStats.k8}%`, inline: true},
        {name: 'Assists', value: mapStats.m5, inline: true},
        {name: 'MVPs 🌟', value: mapStats.m6, inline: true},
        {name: 'Rounds', value: mapStats.m8, inline: true},
        {name: 'Triple Kills', value: mapStats.m10, inline: true},
        {name: 'Quadro Kills', value: mapStats.m11, inline: true},
        {name: 'ACEs', value: mapStats.m12, inline: true},
        {name: 'Average Kills', value: mapStats.k1, inline: true},
        {name: 'Average Deaths', value: mapStats.k2, inline: true},
        {name: 'Average Assists', value: mapStats.k3, inline: true},
        {name: 'Average MVPs', value: mapStats.k4, inline: true}
    ];

    private getEloThresholds = (currentElo: number): string => {

        const currentRange = eloRanges.find(range => currentElo >= range.min && currentElo <= range.max);
        if (!currentRange) {
            return "NA";
        }

        const lowerRange = currentRange.level > 1 ? eloRanges[currentRange.level - 2] : null;
        const upperRange = eloRanges[currentRange.level - 1];

        const eloToDowngrade = lowerRange ? currentElo - lowerRange.max : '-';
        const eloToUpgrade = upperRange.max - currentElo + 1;

        // @ts-ignore
        return `${lowerRange.max + 1}   [🔽${eloToDowngrade}]    [🔼${eloToUpgrade}]   ${upperRange.max}`;
    };
}
