const faceitService = require('../../services/faceit/faceitService.js');
const templateProvider = require('../../utilities/templateProvider.js');
const {countryCodeEmoji} = require("country-code-emoji");
const Discord = require("discord.js");

module.exports = {
    data: {
        name: 'faceit-general',
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
    execute: async function (message, args) {
        const username = args[0];
        if (username === undefined || username === '') {
            await message.reply(`\`username\` parameter is required. Example \`!faceit your_user_name\`.`);
            return;
        }

        try {
            const userData= await faceitService.fetchUserInfo(username);
            if (userData === null) {
                await message.reply(`No Faceit CS:GO stats found for \`${username}\``);
                return;
            }
                
            const formattedStats = templateProvider.getFaceitUserGeneralInfo(username, userData);

           
            message.channel.send( { embeds: [formattedStats] });
            //await message.reply(formattedStats);
        } catch (error) {
            console.error(error);
            await message.reply(`No Faceit CS:GO stats found for \`${username}\``);
        }
    },
};