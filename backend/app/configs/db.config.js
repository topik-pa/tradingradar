//TODO: url must be taken from env variables
module.exports = {
  url: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_DB_URL : process.env.PRODUCTION_DB_URL
}