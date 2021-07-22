const express = require('express')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
require('dotenv').config()

const app = express()


// Set CORS 
const origin = process.env.ORIGIN
var corsOptions = {
  origin: origin,
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

//Routes
require('./app/routes/public.routes')(app)


// Start server
https.createServer({
  key: fs.readFileSync('certificates/server.key'),
  cert: fs.readFileSync('certificates/server.cert')
}, app).listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} over HTTPS in ${process.env.NODE_ENV} mode. Accepting requests from ${origin}.`)
})

module.exports = app