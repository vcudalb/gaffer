import {
    SlashCommandBuilder,
    Collection,
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    ModalSubmitInteraction, CacheType
} from "discord.js"

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_TOKEN: string;
            WEATHER_API_KEY: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}

export interface SlashCommand {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number
}