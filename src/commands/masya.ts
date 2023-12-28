import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

const slashCommand = new SlashCommandBuilder().setName("masya").setDescription("Shows remaining time until you will be destroyed and humiliated by Masya (23:00)");

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const {hours, minutes, seconds} = formatRemainingTime(getRemainingTime(23, 0, 0));
    const message: string = `Time left until you will be destroyed and humiliated by Masya: ${hours}h ${minutes}m ${seconds}s.`.toString();
    await interaction.reply(message);
    await interaction.deferReply();
}

export {slashCommand};

function formatRemainingTime(remainingTimeInMillis: number) {
    const hours = Math.floor(remainingTimeInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTimeInMillis / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTimeInMillis / 1000) % 60);
    return {hours, minutes, seconds};
}

function getRemainingTime(hour: number, minute: number, second: number) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hour, minute, second, 0);
    return Math.max(0, targetTime.getTime() - now.getTime());
}