import {Client, SlashCommandBuilder} from 'discord.js';
import {readdirSync} from 'fs';
import {join} from 'path';
import {SlashCommand} from '../../../global';
import {ILoader} from "./abstractions/ILoader";

export default class SlashCommandLoader implements ILoader {
    private client: Client;
    private readonly slashCommandsDir: string;

    constructor(client: Client) {
        this.client = client;
        this.slashCommandsDir = join(__dirname, '../../slashCommands');
    }

    public load(): void {
        const slashCommands: SlashCommandBuilder[] = [];

        readdirSync(this.slashCommandsDir).forEach(file => {
            if (!file.endsWith('.ts')) return;

            try {
                const module = require(`${this.slashCommandsDir}/${file}`);
                const command: SlashCommand = module.default;

                slashCommands.push(command.command);
                this.client.slashCommands.set(command.command.name, command);
            } catch (error) {
                const errMsg = (error as Error).message || 'Unknown error';
                console.error(`Failed to load command ${file}: ${errMsg}`);
            }
        });

        this.client.application?.commands.set(slashCommands)
            .then(() => console.log('Slash commands successfully registered'))
            .catch(error => console.error('Failed to register slash commands:', error));
    }
}
