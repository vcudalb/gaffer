import 'reflect-metadata';
import 'dotenv/config';
import container from "./inversify.config";
import { TYPES } from "./Types";
import { Gaffer } from "./Gaffer";
import { Collection } from "discord.js";
import { SlashCommand } from "../global";
import {LoaderHandler} from "./handlers/LoaderHandler";

const gaffer = container.get<Gaffer>(TYPES.Gaffer);

// Start the bot
gaffer.login()
    .then(async () => {
        gaffer.client.slashCommands = new Collection<string, SlashCommand>();
        gaffer.client.cooldowns = new Collection<string, number>();

        const loaderHandler = new LoaderHandler(gaffer.client);
        loaderHandler.loadHandlers();
        
        try {
            await gaffer.deployCommands();
            console.log('Commands deployed successfully');
        } catch (reason: unknown) {
            const errMsg = (reason as Error).message || 'Unknown error';
            console.error('Deploy of the commands failed with reason: ', errMsg);
        }
    })
    .catch((reason: unknown) => {
        const errMsg = (reason as Error).message || 'Unknown error';
        console.error('Start of the bot failed with reason: ', errMsg);
    });
