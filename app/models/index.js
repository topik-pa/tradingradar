const dbConfig = require('../configs/db.config.js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

//DB ENTITIES
db.ftseMibStocks = require('./ftseMibStock.model.js')(mongoose)
db.users = require('./user.model.js')(mongoose)

module.exports = db