const { userSchema } = require('../Models/user.model')

const generateUserId = async () => {
    let data = await userSchema.find({})
    let no = data.length + 1 + 1000000
    return `${no}_bt`
}

const saveUserInfo = async (telegramData) => {
    const userId = await generateUserId()
    return new Promise((resolve, reject) => {
        if (telegramData.is_bot) {
            reject({ status: false, errorMsg: "Bots are not allowed!" })
        }

        const data = {
            firstName: telegramData.first_name,
            lastName: telegramData.last_name,
            telegramUsername: telegramData.username,
            chatId: telegramData.id,
            userId
        }
        let user = new userSchema(data)
        user.save()
        .then((response)=>{
            console.log(response)
            resolve({ status: true, data: response })
        })
        .catch((err)=>{
            console.error(err)
            if (err.code === 11000) {
                reject({ status: false, errorMsg: "Already a user", code: err.code})
            }

            reject({ status: false, errorMsg: "Unknown error"})
        })
    })
}


module.exports = {
    saveUserInfo
}