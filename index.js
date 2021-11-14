const express = require('express')
const cors = require('cors')
const http = require('http')
require('dotenv').config()

const app = express()


// Set CORS 
var corsOptions = {
  origin: process.env.ORIGIN,
  credentials:  true
}
app.use(cors(corsOptions))


// Parse application/json
app.use(express.json())
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}))


//DATABASE 
/*
const db = require('./app/models')
db.mongoose
  .connect(db.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })
*/

//Routes
require('./app/routes/info.routes')(app)
require('./app/routes/analysis.routes')(app)
require('./app/routes/news.routes')(app)
require('./app/routes/stocks.routes')(app)

// Start server
//HTTPS
/*https.createServer({
  key: fs.readFileSync('certificates/server.key'),
  cert: fs.readFileSync('certificates/server.cert')
}, app).listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} over HTTPS in ${process.env.NODE_ENV} mode.\nAccepting requests from ${process.env.ORIGIN}.`)
})*/
//HTTP
http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.\nAccepting requests from ${process.env.ORIGIN}.`)
})

module.exports = app