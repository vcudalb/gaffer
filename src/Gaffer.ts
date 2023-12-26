import {ApplicationCommandData, Client, Collection, Interaction, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./Types";
import path from "path";
import * as fs from "fs";

@injectable()
export class Gaffer {
    public client: Client;
    private readonly token: string;
    private commands!: ApplicationCommandData[];

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string
    ) {
        this.client = client;
        this.token = token;
    }

    public listen(): void {
        this.client.on('message', (message: Message) => {
            console.log("Message received! Contents: ", message.content);
        });
    }

    public async start(): Promise<void> {
        await this.deployCommands();
        await this.client.login(this.token);
    }

    public async handleInteraction(interaction: Interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;
        const command = this.commands.find(cmd => cmd.name === commandName);

        if (!command) {
            console.error(`Unknown command: ${commandName}`);
            return;
        }

        try {
            const { execute } = await import(`./commands/${commandName}`);
            if (execute) {
                await execute(interaction);
            } else {
                console.error(`Execute method not found for command: ${commandName}`);
            }
        } catch (error) {
            console.error(`Error handling command ${commandName}:`, error);
        }
    }

    public async deployCommands(): Promise<void> {
        const commandsFolder = path.resolve(__dirname, 'commands');

        const commands = await this.loadCommandsFromFolder(commandsFolder);

        try {
            const [commandArray] = await Promise.all([this.client.application?.commands.set(commands) ?? []]);
            console.log('Deployed commands:', commandArray);
        } catch (error) {
            console.error('Error deploying commands:', error);
        }

        this.commands = [...commands];
    }

    private async loadCommandsFromFolder(folderPath: string): Promise<ApplicationCommandData[]> {
        const files = fs.readdirSync(folderPath);

        const commandFiles = files.filter(file => file.endsWith('.ts'));
        const commands = [];

        for (const file of commandFiles) {
            const commandPath = path.resolve(folderPath, file);
            console.log('Processing file:', commandPath); // Add this line for debugging

            try {
                const { slashCommand } = await import(commandPath);
                commands.push({ ...slashCommand, name: slashCommand.name });
            } catch (error) {
                console.error(`Error importing command from ${commandPath}:`, error);
            }
        }

        return commands;
    }
}