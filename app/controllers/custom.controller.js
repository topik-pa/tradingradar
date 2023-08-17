const nodemailer = require('nodemailer')
const db = require('../models')
const FTSEMibStock = db.ftseMibStocks

const transporter = nodemailer.createTransport({
  host: 'authsmtp.securemail.pro',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD
  }
})
async function main(data) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Follow title 👻" <marco@tradingradar.net>', // sender address
    to: 'marco@tradingradar.net', // list of receivers
    subject: 'New follower ✔', // Subject line
    html: `<h3>New follower</h3>
            <p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <p>Privacy: ${data.privacy}</p>
            <p>Title: ${data.title}</p>
    ` // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

exports.getCustomData = async (req, res, next) => {
  let custom = {}

  // GET Golden Cross Up
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$gt: ['$mm20days.value', '$mm40days.value']}} ]} )
    let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 2
    results.forEach((stock) => {
      let currDeltaPerc = (stock.mm20days.value - stock.mm40days.value) / (stock.mm40days.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.gcup = returnings.sort( (a,b) => a.delta - b.delta )
  } catch (error) {
    return next(error)
  }

  // GET Golden Cross Down
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$lt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$lt: ['$mm20days.value', '$mm40days.value']}} ]} )
    let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 1.5
    results.forEach((stock) => {
      let currDeltaPerc = (stock.mm40days.value - stock.mm20days.value) / (stock.mm20days.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA  ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.gcdown = returnings.sort( (a,b) => a.delta - b.delta )
  } catch (error) {
    return next(error)
  }

  // GET Up trends
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$gt: ['$lastPrice.value', '$mm40days.value']}}, {$expr: {$gt: ['$lastPrice.value', '$mm100days.value']}}, {$expr: {$gt: ['$mm20days.value', '$mm40days.value']}}, {$expr: {$gt: ['$mm40days.value', '$mm100days.value']}} ]}
    )
    custom.uptrends = results
  } catch (error) {
    return next(error)
  }

  // GET Down trends
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$lt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$lt: ['$lastPrice.value', '$mm40days.value']}}, {$expr: {$lt: ['$lastPrice.value', '$mm100days.value']}}, {$expr: {$lt: ['$mm20days.value', '$mm40days.value']}}, {$expr: {$lt: ['$mm40days.value', '$mm100days.value']}} ]}
    )
    custom.downtrends = results
  } catch (error) {
    return next(error)
  }

  // GET Trend inversion up
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$gt: ['$lastPrice.value', '$mm40days.value']}}, {$expr: {$lt: ['$mm20days.value', '$mm40days.value']}}, {$expr: {$lt: ['$mm40days.value', '$mm100days.value']}} ]} )
    /*let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 1.5
    results.forEach((stock) => {
      let currDeltaPerc = (stock.lastPrice.value - stock.mm20days.value) / (stock.mm20days.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.tiup = returnings.sort( (a,b) => a.delta - b.delta )*/
    custom.tiup = results
  } catch (error) {
    return next(error)
  }

  // GET Trend inversion down
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$lt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$lt: ['$lastPrice.value', '$mm40days.value']}}, {$expr: {$gt: ['$mm20days.value', '$mm40days.value']}}, {$expr: {$gt: ['$mm40days.value', '$mm100days.value']}} ]} )
    /*let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 1.5
    results.forEach((stock) => {
      let currDeltaPerc = (stock.mm20days.value - stock.lastPrice.value) / (stock.lastPrice.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.tidown = returnings.sort( (a,b) => a.delta - b.delta )*/
    custom.tidown = results
  } catch (error) {
    return next(error)
  }


  return res.json(custom)
}


exports.addFollower = async (req) => {
  const mailData = {
    name: req.body.name,
    email: req.body.email,
    privacy: req.body.privacy,
    title: req.body.title
  }
  main(mailData).catch(console.error)
}
