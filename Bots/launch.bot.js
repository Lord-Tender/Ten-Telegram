const { Telegraf  } = require('telegraf')
require('dotenv').config()
const telegramToken = process.env.TELEGRAM_TOKEN
const { saveUserInfo } = require('../Controllers/user.controller')
const { welcomeMsg } = require('./message.bot')

const launchBot = () => {
    const bot = new Telegraf(telegramToken)

    // Handle starting
    bot.start((ctx)=>{
        if (ctx.from.is_bot) {
            ctx.reply('Bot are not allowed');
            return;
        }
        saveUserInfo(ctx.from)
        .then((data)=>{
            console.log(data)
            const msg = welcomeMsg()
            ctx.reply(msg)
        })
        .catch((error)=>{
            if (error.code == 11000) {
                ctx.reply("You're already a user, Enjoy earning with us😉")
                return;
            }

            ctx.reply(error.errorMsg)
        })
    })

    bot.launch()
    console.log('Bot launched!!!')
}

module.exports = launchBot