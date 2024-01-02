import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../global';
import {FaceitApiService} from '../services/faceit/FaceitApiService'; 
import { EmbedsProvider } from '../core/providers/EmbedsProvider';

const MAPS = ['de_dust2', 'de_inferno', 'de_mirage', 'de_nuke', 'de_overpass', 'de_train', 'de_vertigo'];
let faceitService = new FaceitApiService();

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('cs2-lifetime')
        .setDescription('Fetches CS2 lifetime stats for provided user')
        .addStringOption((option) => {
            return option.setName('username').setDescription('The Faceit username to fetch stats for').setRequired(true);
        }) as SlashCommandBuilder,

    execute: async (interaction) => {
        const username = interaction.options.getString('username');

        if (!username) {
            await interaction.reply('`username` parameter is required. Example: `/cs2-lt your_user_name`');
            return;
        }

        try {
            const userData = await faceitService.fetchUserInfo(username);

            if (!userData) {
                await interaction.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${username}\``);
                return;
            }

            const lifeTimeData = await faceitService.fetchLifeTimeStats(userData.payload.id);

            if (!lifeTimeData) {
                await interaction.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${userData.payload.id}\``);
                return;
            }

            const embedsProvider = new EmbedsProvider();
            const embeds = embedsProvider.getLifeTimeEmbeds(userData, lifeTimeData.lifetime);

            await interaction.reply({ embeds: [embeds] });
        } catch (error) {
            console.error(error);
            await interaction.reply(`Oh no, buddy! It looks like those other pups won't play with us today 🐶`);
        }
    },
};

export default command;
