const faceitService = require('../../services/faceit/faceitService.js');
const templateProvider = require('../../utilities/templateProvider.js');

module.exports = {
    data: {
        name: 'faceit-lastmatches',
        description: 'Fetches CS:GO stats from Faceit for a user',
        options: [
            {
                name: 'username',
                description: 'The Faceit username to fetch stats for',
                type: 'STRING',
                required: true,
            },
        ],
    },
    async execute(message, args) {
        const userId = args[0];
        if (userId === undefined || userId === '') {
            await message.reply(`\`userId\` parameter is required. Example \`!faceit-lastmatchesyour_user_id\`.`);
            return;
        }

        try {
            const lastMatches = await faceitService.fetchLastMatchesStats(userId);
            if(lastMatches === null){
                await message.reply(`No Faceit CS:GO stats found for \`${userId}\``);
                return;
            }
            const formattedStats = templateProvider.getFaceitUserGeneralInfo(userId, lastMatches);

            await message.reply(formattedStats);
        } catch (error) {
            console.error(error);
            await message.reply(`No Faceit CS:GO stats found for \`${userId}\``);
        }
    },
};