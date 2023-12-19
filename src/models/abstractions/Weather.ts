export interface Weather {
    current: {
        feelslike_c: number;
        humidity: number;
        wind_kph: number;
        temp_c: number;
        wind_dir: string;
        condition: {
            text: string;
            icon: string;
        };
    };
    location: {
        name: string;
        country: string;
    };
}