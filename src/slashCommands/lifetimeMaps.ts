import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../global';
import { FaceitApiService } from '../services/faceit/FaceitApiService';
import { EmbedsProvider } from '../core/providers/EmbedsProvider';
import {ICsMapStats} from "../models/abstractions/ICsMapStats";

const MAPS = ['de_dust2', 'de_inferno', 'de_mirage', 'de_nuke', 'de_overpass', 'de_train', 'de_vertigo'];
const embedsProvider = new EmbedsProvider();
const faceitService = new FaceitApiService();

interface Segment {
    _id: {
        game: string;
        gameMode: string;
        segmentId: string;
    };
    segments: Record<string, unknown>;
}

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('cs2-lifetime-maps')
        .setDescription('Fetches CS2 lifetime stats for the provided user and the specific map')
        .addStringOption((option) =>
            option.setName('username').setDescription('The Faceit username to fetch stats for').setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('map').setDescription('The name of the CS2 map').setRequired(true)
        ) as SlashCommandBuilder,

    execute: async (interaction) => {
        const username = interaction.options.getString('username');
        const mapName = interaction.options.getString('map');

        if (!username || !mapName) {
            await interaction.reply('`username` and `map` parameters are required. Example: `/cs2-ltm n0wak-- de_nuke`');
            return;
        }

        if (!MAPS.includes(mapName)) {
            await interaction.reply('Invalid map name. Available maps: ' + MAPS.join(', '));
            return;
        }

        try {
            const userData = await faceitService.fetchUserInfo(username);
            if (!userData) {
                await interaction.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${username}\``);
                return;
            }

            const lifeTimeData = await faceitService.fetchLifeTimeStats(userData.payload.id);
            if (!lifeTimeData || !lifeTimeData.segments) {
                await interaction.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${userData.payload.id}\``);
                return;
            }

            const segments = lifeTimeData.segments as Segment[];
            const filteredSegments = segments.filter(
                (segment) => segment._id.game === 'cs2' && segment._id.gameMode === '5v5' && segment._id.segmentId === 'csgo_map'
            );

            if (filteredSegments.length === 0 || !filteredSegments[0].segments[mapName]) {
                await interaction.reply('No map stats available.');
                return;
            }

            const embeds = embedsProvider.getLifeTimeMapEmbeds(username, userData.payload.avatar, filteredSegments[0].segments[mapName] as ICsMapStats, mapName);

            await interaction.reply({ embeds: [embeds] });
        } catch (error) {
            console.error(error);
            await interaction.reply(`Oh no, buddy! It looks like those other pups won't play with us today 🐶`);
        }
    },
    cooldown: 5
};

export default command;
