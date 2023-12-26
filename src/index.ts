import 'reflect-metadata';
import 'dotenv/config';
import container from "./inversify.config";
import {TYPES} from "./Types";
import {Gaffer} from "./Gaffer";

let gaffer = container.get<Gaffer>(TYPES.Gaffer);

gaffer.start().then(()=> {
    console.log('Gaffer started!');
}).catch((reason:any) => {
    console.log('Start of the bot failed with reason: ', reason )});

gaffer.client.on('interactionCreate', async (interaction) => {
    await gaffer.handleInteraction(interaction);
});