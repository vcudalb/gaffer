import {CommandInteraction, GuildMember, SlashCommandBuilder, VoiceChannel, ApplicationCommandOptionType} from 'discord.js';
import {QueryType, useMainPlayer} from "discord-player";
// @ts-ignore
import { joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';
import ytdl from 'ytdl-core-discord';


import {SlashCommand} from "../../global";


const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays music from a YouTube link.')
        .addStringOption((option) =>
            option
                .setName('youtube_link')
                .setDescription('The YouTube link of the music to play.')
                .setRequired(true)
        ) as SlashCommandBuilder,

    execute: async (interaction) => {
        //const youtubeLink = interaction.options.getString('youtube_link', true);
        //const member = interaction.member as GuildMember;

        try {
            //await interaction.deferReply();

            const player = useMainPlayer()
            const query = interaction.options.getString('youtube_link');
            // @ts-ignore
            const searchResult = await player.search(query)
            if (!searchResult.hasTracks())
                return void interaction.followUp({content: 'No results were found!'});

            try {
                // @ts-ignore
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 10,
                        //defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
                    }
                });

                await interaction.followUp({
                    content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
                });
            } catch (error) {
                await interaction.editReply({
                    content: 'An error has occurred!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: `There was an error trying to execute that command: ${error}`,
            });
        }
    },
    cooldown: 2,
};

async function playMusic(interaction: any, connection: any, youtubeLink: string) {
    try {
        const dispatcher = connection.play(await ytdl(youtubeLink), { type: 'opus' });

        dispatcher.on('finish', () => {
            connection.destroy();
        });
    } catch (error) {
        console.error('Error playing music:', error);
        await interaction.reply('There was an error playing the music.');
    }
}
export default command;