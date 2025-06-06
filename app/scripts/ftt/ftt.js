const cron = require('node-cron')
const FormData = require('form-data')
const Mailgun = require('mailgun.js')
const { generaEmailHTML } = require('./generaEmailHTML')

const BATCH = 10

module.exports = (User, Stocks) => {
  cron.schedule('0 21 * * 1,2,3,4,5', async () => {
  //cron.schedule('*/5 * * * * *', async () => {
    for await (const user of User.find()) {
      for (const subscription of user.subscriptions) {
        if(subscription.active) {
          const stock = await Stocks.findOne({ isin: subscription.isin })
          let sent = subscription.sent
          let html
          try {
            html = generaEmailHTML(stock)
          } catch (error) {
            console.error(error)
          }
          const maildata = {
            from: 'tradingradar.net <followthetitle@ftt.tradingradar.net>',
            to: `${user.name} <${user.email}>`,
            subject: `Segui il titolo: ${subscription.stock} - email ${sent+1}/${ (parseInt(sent/BATCH)+1)*BATCH}`,
            html: html
          }
          sent++
          sendSimpleMessage(maildata)
          subscription.sent = sent
          subscription.active = (sent % BATCH)!==0

          user.markModified('subscriptions')
          user.save(err => console.log(err))
        }
      }
    }
  })
}

async function sendSimpleMessage(maildata) {
  const mailgun = new Mailgun(FormData)
  const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_SECRET_KEY,
    url: 'https://api.eu.mailgun.net'
  })
  try {
    const data = await mg.messages.create('ftt.tradingradar.net', {
      from: maildata.from,
      to: maildata.to,
      subject: maildata.subject,
      html: maildata.html
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
