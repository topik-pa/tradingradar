require('dotenv').config()

let url = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_DB_URL : process.env.DB_URL
module.exports = {
  url
}