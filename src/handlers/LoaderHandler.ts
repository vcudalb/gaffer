import {Client} from 'discord.js';
import {readdirSync} from 'fs';
import {join} from 'path';
import {ILoader} from "./loaders/abstractions/ILoader";

export class LoaderHandler {
    private client: Client;
    private handlersDir: string;

    constructor(client: Client) {
        this.client = client;
        this.handlersDir = join(__dirname, 'loaders');
    }

    public loadHandlers(): void {
        readdirSync(this.handlersDir).forEach(file => {
            if (file.endsWith('.ts')) {
                this.loadHandler(file);
            }
        });
    }

    private async loadHandler(file: string): Promise<void> {
        try {
            const modulePath = join(this.handlersDir, file);
            const module = await import(modulePath);
            const HandlerClass = module.default;

            if (typeof HandlerClass === 'function') {
                const handlerInstance: ILoader = new HandlerClass(this.client);
                if (typeof handlerInstance.load === 'function') {
                    handlerInstance.load();
                } else {
                    console.warn(`No load function found in ${file}`);
                }
            } else {
                console.warn(`Module default export is not a class in ${file}`);
            }
        } catch (error) {
            const errMsg = (error as Error).message || 'Unknown error';
            console.error(`Failed to load handler ${file}: ${errMsg}`);
        }
    }
}