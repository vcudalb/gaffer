import path from "path";
import dotenv from "dotenv";
import * as process from "process";
dotenv.config({ path: path.resolve(__dirname, ".env") });

interface ENV {
    CLIENT_TOKEN: string | undefined;
    WEATHER_API_KEY: string | undefined;
}

interface Config {
    CLIENT_TOKEN: string;
    WEATHER_API_KEY: string;
}

const getConfig = (): ENV => {
    return {
        CLIENT_TOKEN: process.env.CLIENT_TOKEN,
        WEATHER_API_KEY: process.env.WEATHER_API_KEY
    };
};

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;