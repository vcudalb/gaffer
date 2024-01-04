import { Client, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../../global";

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []
    let slashCommandsDir = join(__dirname,"../slashCommands")

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })

    client.application?.commands.set(slashCommands);
}