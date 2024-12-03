const mongoose = require('mongoose')

userSchema = mongoose.Schema(
    {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        telegramUsername: { type: String, require: true },
        chatId: { type: String, require: true, unique: true },
        userId: { type: String, require: true, unique: true },
        userBalance: { type: Number, default: 0 }
    }
)

referral = mongoose.Schema(
    {
        referrerUserId: { type: String, require: true },
        refereeId: { type: String, require: true }
    }
)


module.exports = {
    userSchema: mongoose.model('user', userSchema),
    referralSchema: mongoose.model('referral', referral)
}