const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const telegramToken = process.env.TELEGRAM_TOKEN
const { saveUserInfo, saveReferral } = require('../Controllers/user.controller')
const { welcomeMsg } = require('./message.bot')
const { checkMembership } = require('./func.bot')

const launchBot = () => {
    const bot = new Telegraf(telegramToken)

    bot.start((ctx) => {
        if (ctx.from.is_bot) {
            ctx.reply('Bot are not allowed');
            return;
        }
        saveUserInfo(ctx.from)
            .then( async (data) => {
                await saveReferral(ctx.payload, data.data.userId)
                const msg = welcomeMsg()
                await ctx.reply(`👋Hello, Welcome to Epidomax. https://t.me/tender_test_1bot?start=${data.data.userId}`,
                    Markup.keyboard([
                        ['Daily Reward 🎁', 'Balance 💰'],
                        ['Task 💼', 'Invite ✉'],
                        ['Withdrawal 💳', 'Advertise 📢'],
                        ['Join Us on all Social Media ✅'],
                    ])
                        .resize()
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
        console.log(ctx.from)
        checkMembership(ctx)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    });

    bot.launch()
    console.log('Bot launched!!!')
}

module.exports = launchBot