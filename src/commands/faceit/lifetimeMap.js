import {FaceitApiService} from "../../services/faceit/FaceitApiService";
import {EmbedsProvider} from "../../core/providers/EmbedsProvider";

const embedsProvider = require('../../utilities/embedsProvider');
const MAPS = ['de_dust2', 'de_inferno', 'de_mirage', 'de_nuke', 'de_overpass', 'de_train', 'de_vertigo'];

module.exports = {
    data: {
        name: 'cs2-ltm',
        description: 'Fetches CS2 lifetime stats for provided user',
        options: [
            {
                name: 'username',
                description: 'The Faceit username to fetch stats for',
                type: 'STRING',
                required: true,
            },
            {
                name: 'map',
                description: 'The name of the CS2 map',
                type: 'STRING',
                required: true,
            },
        ],
    },
    async execute(message, args) {
        const username = args[0];
        if (username === undefined || username === '') {
            await message.reply(`\`username\` parameter is required. Example \`!fct-ltm n0wak-- de_nuke\`.`);
            return;
        }

        const mapName = args[1];
        if (mapName === undefined || mapName === '') {
            await message.reply(`\`map\` parameter is required. Example \`!fct-ltm n0wak-- de_nuke\`.`);
            return;
        }

        if (!MAPS.includes(mapName)) {
            message.reply('Invalid map name. Available maps: ' + MAPS.join(', '));
            return;
        }
        
        try {
            const userData= await FaceitApiService.fetchUserInfo(username);
            if (userData === null) {
                await message.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${username}\``);
                return;
            }
            
            const lifeTimeData= await FaceitApiService.fetchLifeTimeStats(userData.payload.id);
            if(lifeTimeData === null || lifeTimeData.segments === undefined){
                await message.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${userData.payload.id}\``);
                return;
            }
            
            const segments = lifeTimeData.segments;
            const filteredSegments = Object.values(segments).filter(
                (segment) => segment._id.game === 'cs2' && segment._id.gameMode === '5v5' && segment._id.segmentId === 'csgo_map'
            );

            if (filteredSegments.length === 0 || filteredSegments[0].segments[mapName] === undefined) {
                message.reply('No map stats available.');
                return;
            }
            
            const embeds = embedsProvider.getLifeTimeMapEmbeds(username, userData.payload.avatar, filteredSegments[0].segments[mapName], mapName);

            await message.reply({ embeds: [embeds] });
        } catch (error) {
            console.error(error);
            await message.reply(`Oh no, buddy! It looks like those other pups won't play with us today 🐶`);
        }
    },
};