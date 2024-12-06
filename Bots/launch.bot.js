const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const telegramToken = process.env.TELEGRAM_TOKEN
const { saveUserInfo, saveReferral, getUser } = require('../Controllers/user.controller')
const { welcomeMsg, getwelSuccess } = require('./message.bot')
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
                console.log(data)
                try{
                    if (ctx.payload) {
                        await saveReferral(ctx.payload, data.data.userId)
                    }
                }catch(err) {
                    console.log(err)
                }
                const msg = welcomeMsg()
                ctx.reply(msg,
                    {
                        parse_mode: 'MarkdownV2',
                        ...Markup.inlineKeyboard([
                            Markup.button.callback('🎁 Get bonus', 'CHECK'),
                        ]),
                    }
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
            .then( async (res) => {
                let user = await getUser(ctx.from.id)
                console.log(user)
                if (res[0].status && res[1].status && res[2].status && !user.welbonusCredit) {
                    const msg = getwelSuccess()
                    ctx.reply(msg, 
                        {
                            parse_mode: 'HTML',
                            ...Markup.keyboard([
                                ['Daily Reward 🎁', 'Balance 💰'],
                                ['Task 💼', 'Invite ✉'],
                                ['Withdrawal 💳', 'Advertise 📢'],
                                ['Join Us on all Social Media ✅'],
                            ])
                        }
                    )
                    user.welbonusCredit = true
                    user.save()
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    });

    bot.launch()
    console.log('Bot launched!!!')
}

module.exports = launchBot