import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./Types";
import {Gaffer} from "./Gaffer";
import {Client, GatewayIntentBits} from "discord.js";
import config from "./configs/config";

let container = new Container();

container.bind<Gaffer>(TYPES.Gaffer).to(Gaffer).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
}));

container.bind<string>(TYPES.Token).toConstantValue(config.CLIENT_TOKEN);

export default container;