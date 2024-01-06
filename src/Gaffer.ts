import {Client} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./Types";

@injectable()
export class Gaffer {
    public client: Client;
    private readonly token: string;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string
    ) {
        this.client = client;
        this.token = token;
    }
    
    public async login(): Promise<void> {
        await this.client.login(this.token);
    }

    public async deployCommands(): Promise<void> {
        try {
            if (!this.client.application) {
                console.error('Error: Application not found.');
                return;
            }

            const commandData = this.client.slashCommands.map((c) => c.command);

            if (!commandData.length) {
                console.warn('Warning: No commands to deploy.');
                return;
            }

            const deployedCommands = await this.client.application.commands.set(commandData);

            if (!deployedCommands || !deployedCommands.size) {
                console.warn('Warning: No commands were deployed.');
            } else {
                console.log('Commands successfully deployed:', deployedCommands);
            }
        } catch (error) {
            console.error('Error deploying commands:', error);
        }
    }
}