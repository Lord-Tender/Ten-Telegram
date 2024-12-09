const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const telegramToken = process.env.TELEGRAM_TOKEN
const { saveUserInfo, saveReferral, getUser, editUserData, creditUser } = require('../Controllers/user.controller')
const { welcomeMsg, getwelSuccess, getwelError, referralComMsg } = require('./message.bot')
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
                try{
                    if (ctx.payload) {
                        await saveReferral(ctx.payload, data.data.userId)
                    }
                }catch(err) {
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
            .catch( async (error) => {
                if (error.code == 11000) {
                    await ctx.reply("You're already a user, Enjoy earning with us😉")
                    return;
                }

                ctx.reply(error.errorMsg)
            })
    })

    bot.hears('Referral ✉', async (ctx) => {
        let user = await getUser(ctx.from.id)
        const msg = referralComMsg(user.data.userId)
        ctx.reply(msg,
            {
                parse_mode: 'HTML',
            }
        )
    })

    bot.action('CHECK', (ctx) => {
        ctx.answerCbQuery();
        checkMembership(ctx)
            .then( async (res) => {
                let user = await getUser(ctx.from.id)

                if (user.data.welbonusCredit == true) {
                    await ctx.reply("You completed the task and received your welcoming bonus already☺")
                    return;
                }

                if (!res[0].status || !res[1].status || !res[2].status) {
                    const msg = getwelError()
                    ctx.reply(msg, {
                        parse_mode: 'HTML',
                        ...Markup.inlineKeyboard([
                            Markup.button.callback('🎁 Get bonus', 'CHECK'),
                        ]),
                    })
                    return;
                }

                if (res[0].status && res[1].status && res[2].status && user.data.welbonusCredit === false) {
                    const msg = getwelSuccess()
                    await creditUser(user.data.userId, 2500)
                    ctx.reply(msg, 
                        {
                            parse_mode: 'HTML',
                            ...Markup.keyboard([
                                ['Daily Reward 🎁', 'Balance 💰'],
                                ['Task 💼', 'Referral ✉'],
                                ['Withdrawal 💳', 'Advertise 📢'],
                                ['Join Us on all Social Media ✅'],
                            ])
                        }
                    )
                    editUserData(user.data.userId, { title: "welbonusCredit", value: true })
                    .then((data) => {
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