export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_TOKEN: string;
            WEATHER_API_KEY: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}