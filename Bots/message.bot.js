const welcomeMsg = () => {
  return     '*👋Hello, Welcome to Epidomax\\.* \n' +
  '\n' +
  'Epidomax is a platform where you can make money by completing simple Task\\. \n' +
  '\n' +
  ' 🎁 ₦1,000 Daily reward \n' +
  ' 🎁 ₦500 Minimum task reward \n' +
  ' 🎁 ₦2,000 Referral bonus \n' +
  ' 🎁 ₦2,500 Welcoming bonus\\. \n' +
  '\n' +
  'To get started and receive your welcoming bonus, Join and Subcribe to our communities: \n' +
  '\n' +
  '◀ Join👉 @tenderseries \n' +
  '◀ Join👉 @earner065 \n' +
  '◀ Join👉 @earner066 \n' +
  '\n' +
  'When you\'re done, click on "Get bonus" below\\.';
}

const getwelSuccess = () => {
  return `
  <b>🎉 Congratulations 🎉</b>\n\nYou have successfully joined Epidomax and received your welcoming bonus of ₦2,500.\n\n<b>You can earn more by:</b>\n\n🔹 Checking here daily for bonus(Daily rewards)\n🔹 Completing simpe task for rewards(Task)\n🔹 Inviting friend to join for rewards(Referral)\n🔹 Getting your achievement rewards(Achievement)\n\n<b>Happy earning☺</b>
  `
}

const getwelError = () => {
  return `
  <b>🚫 Error 🚫</b>\n\nYou have not joined all the groups, please join all the groups to receive your welcoming bonus.\n\nJoin and Subcribe to our communities:\n\n◀ Join👉 @tenderseries \n◀ Join👉 @earner065 \n◀ Join👉 @earner066 \n\n Click on "Get bonus" below to re-check.
  `
}

const referralComMsg = (userId) => {
  return `
    <b>You get a reward of ₦1,000< for each person you invite.</b>\nTo invite and earn, copy your referral link below and share with friend for them to join.\n\n<b>Referral Link:</b>\n\nhttps://t.me/tender_test_1bot?start=${userId}
  `
}

module.exports = {
    welcomeMsg,
    getwelSuccess,
    getwelError,
    referralComMsg
}