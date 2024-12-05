const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const telegramToken = process.env.TELEGRAM_TOKEN

const bot = new Telegraf(telegramToken)

const checkMembership = (ctx) =>  {
    return new Promise( async (resolve, reject) => {
        let group = [ '@tenderseries', '@earner065', '@earner065' ]
        const user = ctx.from.id
        let check = [];
        for (let i = 0; i < group.length; i++) {
            try{
                const member = await ctx.telegram.getChatMember(group[i], user);
                console.log(member)
                if (member.status == 'member') {
                    check.push({ group: group[i], status: true })
                } else {
                    check.push({ group: group[i], status: false })
                }
            }catch(err){
                check.push({ group: group[i], status: false, err })
                console.log(err)
            }
        }
        resolve(check)
    })

}

module.exports = {
    checkMembership
}