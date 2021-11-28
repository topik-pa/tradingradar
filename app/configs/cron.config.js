require('dotenv').config()

let cron = process.env.NODE_ENV === 'test' ? '* */8 * * *' : process.env.NODE_ENV === 'development' ? '*/2 * * * *' : '* */8 * * *'

module.exports = {
  cron
}