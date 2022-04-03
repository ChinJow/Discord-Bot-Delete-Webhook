const Discord = require('discord.js')
const axios = require('axios').default
const client = new Discord.Client({intents: new Discord.Intents(32767)})
const prefix = ""
const token = ""
client.login(token)

client.on('ready', () => {
    console.log(client.user.tag)
})

client.on('messageCreate',async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLocaleLowerCase()
    if(command === "delete"){
        if(!args[0]) return message.reply({embeds : [new Discord.MessageEmbed().setColor('RED').setTitle('โปรดใส่ลิงค์เว็บฮุค').setFooter(message.author.tag)]})
        if(!args[0].includes("https://discord.com/api" && "webhooks")){
           return message.reply({embeds : [new Discord.MessageEmbed().setColor('RED').setTitle('โปรดใส่ลิงค์ให้ถูก').setFooter(message.author.tag)]})
        }else{
            let a = (await axios.delete(args[0], {validateStatus: false}))
            if(a.data.message === "Unknown Webhook" || a.data.message === "Invalid Webhook Token" || a.data.webhook_id[0].includes('is not snowflake.') || a.data.webhook_id[0].includes('snowflake value should') || a.data.message === "401"){
                message.reply({embeds : [new Discord.MessageEmbed().setColor('RED').setTitle('เว็บฮุคนี้ถูกลบไปก่อนแล้วหรือลิงค์ไม่ถูกต้อง').setFooter(message.author.tag)]})
            }else{
                message.reply({embeds : [new Discord.MessageEmbed().setColor('GREEN').setTitle('ลบเรียบร้อย').setFooter(message.author.tag)]})
            }
            }
    }
})