export interface ICsGeneralData {
    payload: {
        games: {
            cs2: {
                faceit_elo: number;
                skill_level_label: string;
                region: string;
            };
        };
        nickname: string;
        country: string;
        matching_sound: string;
        avatar: string;
        cover_image_url: string;
    };
}