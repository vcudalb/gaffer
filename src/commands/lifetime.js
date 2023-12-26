// const MAPS = ['de_dust2', 'de_inferno', 'de_mirage', 'de_nuke', 'de_overpass', 'de_train', 'de_vertigo'];
//
// module.exports = {
//     data: {
//         name: 'cs2-lt',
//         description: 'Fetches CS2 lifetime stats for provided user',
//         options: [
//             {
//                 name: 'username',
//                 description: 'The Faceit username to fetch stats for',
//                 type: 'STRING',
//                 required: true,
//             },
//         ],
//     },
//     async execute(message, args) {
//         const username = args[0];
//         if (username === undefined || username === '') {
//             await message.reply(`\`username\` parameter is required. Example \`!faceit-lt your_user_name\`.`);
//             return;
//         }
//
//         try {
//             const userData= await faceitService.fetchUserInfo(username);
//             if (userData === null) {
//                 await message.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${username}\``);
//                 return;
//             }
//            
//             const lifeTimeData= await faceitService.fetchLifeTimeStats(userData.payload.id);
//             if(lifeTimeData === null){
//                 await message.reply(`Hey, bark at your human and ask them if this is what they call you, buddy: \`${userData.payload.id}\``);
//                 return;
//             }
//             const embeds = embedsProvider.getLifeTimeEmbeds(userData, lifeTimeData.lifetime);
//
//             await message.reply({ embeds: [embeds] });
//         } catch (error) {
//             console.error(error);
//             await message.reply(`Oh no, buddy! It looks like those other pups won't play with us today 🐶`);
//         }
//     },
// };