import {Client} from 'discord.js';
import {readdirSync} from 'fs';
import {join} from 'path';
import {BotEvent} from '../../../global';
import {ILoader} from "./abstractions/ILoader";

export default class EventLoader implements ILoader {
    private client: Client;
    private readonly eventsDir: string;

    constructor(client: Client) {
        this.client = client;
        this.eventsDir = join(__dirname, '../../events');
    }

    public load(): void {
        readdirSync(this.eventsDir).forEach(file => {
            if (file.endsWith('.ts')) {
                this.loadEvent(file);
                console.log('Events successfully registered')
            }
        });
    }

    private async loadEvent(file: string): Promise<void> {
        try {
            const module = await import(`${this.eventsDir}/${file}`);
            const event: BotEvent = module.default;
            if (event.once) {
                this.client.once(event.name, (...args: any[]) => event.execute(...args));
            } else {
                this.client.on(event.name, (...args: any[]) => event.execute(...args));
            }
        } catch (error) {
            const errMsg = (error as Error).message || 'Unknown error';
            console.error(`Failed to load event ${file}: ${errMsg}`);
        }
    }
}
