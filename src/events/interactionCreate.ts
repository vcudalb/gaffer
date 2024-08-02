import { Interaction, ChatInputCommandInteraction, AutocompleteInteraction, ModalSubmitInteraction } from "discord.js";
import { BotEvent } from "../../global";

const handleCooldown = (interaction: ChatInputCommandInteraction, commandName: string, user: string, cooldown: number) => {
    const cooldownKey = `${commandName}-${user}`;
    const currentTime = Date.now();

    if (interaction.client.cooldowns.has(cooldownKey)) {
        const cooldownEnd = interaction.client.cooldowns.get(cooldownKey) as number;
        if (currentTime < cooldownEnd) {
            interaction.reply(`You have to wait ${Math.floor((cooldownEnd - currentTime) / 1000)} second(s) to use this command again.`);
            setTimeout(() => interaction.deleteReply(), 5000);
            return false;
        }
    }
    interaction.client.cooldowns.set(cooldownKey, currentTime + cooldown * 1000);
    setTimeout(() => interaction.client.cooldowns.delete(cooldownKey), cooldown * 1000);
    return true;
};

const handleChatInputCommand = (interaction: ChatInputCommandInteraction) => {
    const command = interaction.client.slashCommands.get(interaction.commandName);
    if (!command) return;

    if (command.cooldown) {
        if (!handleCooldown(interaction, interaction.commandName, interaction.user.username, command.cooldown)) return;
    }

    command.execute(interaction);
};

const handleAutocomplete = (interaction: AutocompleteInteraction) => {
    const command = interaction.client.slashCommands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        if (command.autocomplete) {
            command.autocomplete(interaction);
        }
    } catch (error) {
        console.error(error);
    }
};

const handleModalSubmit = (interaction: ModalSubmitInteraction) => {
    const command = interaction.client.slashCommands.get(interaction.customId);
    if (!command) {
        console.error(`No command matching ${interaction.customId} was found.`);
        return;
    }

    try {
        if (command.modal) {
            command.modal(interaction);
        }
    } catch (error) {
        console.error(error);
    }
};

const event: BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            handleChatInputCommand(interaction as ChatInputCommandInteraction);
        } else if (interaction.isAutocomplete()) {
            handleAutocomplete(interaction as AutocompleteInteraction);
        } else if (interaction.isModalSubmit()) {
            handleModalSubmit(interaction as ModalSubmitInteraction);
        }
    }
};

export default event;