const cron = require('node-cron')
const FormData = require('form-data')
const Mailgun = require('mailgun.js')
const { generaEmailHTML } = require('./generaEmailHTML')

const getData = require('../../controllers/index')

const SERVICE_LEVELS = [5, 10, 20]

module.exports = (User, Stocks) => {
  cron.schedule('0 17 * * 1,2,3,4,5', async () => {
  //cron.schedule('*/10 * * * * *', async () => {
    const yetDone = new Set()
    for await (const user of User.find()) {
      for (const subscription of user.subscriptions) {
        if(subscription.active) {
          let stock = await Stocks.findOne({ isin: subscription.isin })

          if(!yetDone.has(subscription.isin)) {
            try {
              console.log('UPDATE STOCK TO SEND')
              await getData.stock('info', subscription.isin)
              await getData.stock('analyses', subscription.isin)
            } catch (error) {
              console.error(error)
            }
            yetDone.add(subscription.isin)
            stock = await Stocks.findOne({ isin: subscription.isin })
          }
          
          let sl = SERVICE_LEVELS[subscription.sl]
          let sent = subscription.sent
          let html
          try {
            html = generaEmailHTML(stock, user._id)
          } catch (error) {
            console.error(error)
          }
          const maildata = {
            from: 'tradingradar.net <followthetitle@ftt.tradingradar.net>',
            to: `${user.name} <${user.email}>`,
            subject: `Segui il titolo: ${subscription.stock} - email ${++sent}/${sl}`,
            html: html
          }
          sendSimpleMessage(maildata)
          subscription.sent = sent
          subscription.active = sent !== sl

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
