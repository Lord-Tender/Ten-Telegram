const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const telegramToken = process.env.TELEGRAM_TOKEN
const { saveUserInfo } = require('../Controllers/user.controller')
const { welcomeMsg } = require('./message.bot')

const launchBot = () => {
    const bot = new Telegraf(telegramToken)

    bot.start((ctx) => {
        if (ctx.from.is_bot) {
            ctx.reply('Bot are not allowed');
            return;
        }
        console.log("payload " + ctx.payload)
        saveUserInfo(ctx.from)
            .then((data) => {
                const msg = welcomeMsg()
                ctx.reply(`👋Hello, Welcome to Epidomax.`,
                    Markup.keyboard([
                        ['Daily Reward 🎁', 'Balance 💰'],
                        ['Task 💼', 'Invite ✉'],
                        ['Withdrawal 💳', 'Advertise 📢'],
                        ['Join Us on all Social Media ✅'],
                    ])
                        .resize()
                        .persistent()

                )
                ctx.reply(msg,
                    Markup.inlineKeyboard([
                        Markup.button.callback('Get bonus', 'CHECK'),
                    ])
                )

            })
            .catch((error) => {
                if (error.code == 11000) {
                    ctx.reply("You're already a user, Enjoy earning with us😉")
                    return;
                }

                ctx.reply(error.errorMsg)
            })
    })

    bot.action('CHECK', (ctx) => {
        ctx.answerCbQuery();
        ctx.reply('Are you sure');
    });

    bot.launch()
    console.log('Bot launched!!!')
}

module.exports = launchBot