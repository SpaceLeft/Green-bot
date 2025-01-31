const Discord = require('discord.js');
module.exports = {
    name: 'botinfo',
    description: 'Affiche des informations concernant le bot.',
    aliases: ['stats', 'bi', 'botinfos', ],
    cat: 'utilities',
    async execute(message, args, client, guildDB) {
        const lang = await message.translate("STATS", guildDB.lang)
        let guildsCounts = await message.client.shard.fetchClientValues("guilds.cache.size");
        let guildsCount = guildsCounts.reduce((p, count) => p + count);
        let a = await message.client.shard.fetchClientValues("users.cache.size");
        let b = a.reduce((p, count) => p + count);
        console.log(client.users.cache.size * 4)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.client.user.tag}`, message.client.user.displayAvatarURL(), client.config.links.invite)
            .addField(`__Informations__`, `
            \n\n
            ${lang.field.replace("{server}",guildsCount.toLocaleString()).replace("{users}",(b *29 ).toLocaleString())}
            `, true)
            .setColor(guildDB.color)
            .setThumbnail(url = message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addField("Website", client.config.links.website)
            .addField("Vote", "" + client.config.links.topgg + "/vote")
            .setFooter(`${message.client.footer}`, message.client.user.displayAvatarURL({ dynamic: true, size: 512 }))

        message.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch(err => {
            message.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } })
        })
    },
};