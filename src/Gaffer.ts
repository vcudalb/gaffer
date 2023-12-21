import {Client, Message} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./Types";
//import {MessageResponder} from "./services/message-responder";
import {type} from "os";

@injectable()
export class Gaffer {
    private client: Client;
    private readonly token: string;
    
    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string
    ) {
        this.client = client;
        this.token = token;
    }
    public listen(): Promise<string>{
        this.client.on('message', (message: Message): void => {});
        return this.client.login('token should be here');
    }
}