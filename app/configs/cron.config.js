require('dotenv').config()

let cron = process.env.NODE_ENV === 'test' ? '10 13 * * *' : process.env.NODE_ENV === 'development' ? '10 09 * * *' : process.env.CRON
module.exports = {
  cron
}