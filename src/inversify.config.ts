import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./Types";
import {Gaffer} from "./Gaffer";
import {Client, GatewayIntentBits} from "discord.js";
import config from "./configs/config";
import {FaceitApiService} from "./services/faceit/FaceitApiService";
import {EmbedsProvider} from "./core/providers/EmbedsProvider";

let container = new Container();

container.bind<string>(TYPES.Token).toConstantValue(config.CLIENT_TOKEN);
container.bind<Gaffer>(TYPES.Gaffer).to(Gaffer).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent
    ]
}));

container.bind<FaceitApiService>(TYPES.FaceitApiService).toConstantValue(new FaceitApiService());
container.bind<EmbedsProvider>(TYPES.EmbedsProvider).toConstantValue(new EmbedsProvider());

export default container;