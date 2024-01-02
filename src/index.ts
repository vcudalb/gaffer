import 'reflect-metadata';
import 'dotenv/config';
import container from "./inversify.config";
import {TYPES} from "./Types";
import {Gaffer} from "./Gaffer";
import {Collection} from "discord.js";
import {SlashCommand} from "../global";
import {join} from "path";
import {readdirSync} from "fs";

let gaffer = container.get<Gaffer>(TYPES.Gaffer);

gaffer.login().then(() => {
    console.log(`Logged in as ${gaffer.client.user?.tag}`);

    gaffer.client.slashCommands = new Collection<string, SlashCommand>()
    gaffer.client.cooldowns = new Collection<string, number>()

    const handlersDir = join(__dirname, "./handlers")
    readdirSync(handlersDir).forEach(handler => {
        if (!handler.endsWith(".ts")) return;
        require(`${handlersDir}/${handler}`)(gaffer.client)
    })

    gaffer.deployCommands().then(() => {
    }).catch((reason: any) => {
        console.log('Deploy of the commands failed with reason: ', reason)
    });
    
}).catch((reason: any) => {
    console.log('Start of the bot failed with reason: ', reason)
});