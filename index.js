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
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to tradingradar.net API service' })
})
app.get('/api', (req, res) => {
  res.json({
    title: 'Available routes',
    routes: [
      {
        url: '/',
        description: 'Welcome message'
      },
      {
        url: '/api',
        description: 'These informations (current route)'
      },
      {
        url: '/api/info/:isin',
        description: 'Stock informations'
      },
      {
        url: '/api/analysis/:isin',
        description: 'Stock analyses'
      },
      {
        url: '/api/analysis/:isin/:media',
        description: 'Stock analyses by media'
      },
      {
        url: '/api/news/:isin',
        description: 'Stock press release'
      },
      {
        url: '/api/news/:isin/:media',
        description: 'Stock press release by media'
      },
      {
        url: '/api/stocks',
        description: 'Stocks included in this release'
      },
      {
        url: '/api/stocks/:analysis',
        description: 'Stocks with analysis'
      }
    ]
  })
})
require('./app/routes/info.routes')(app)
require('./app/routes/analysis.routes')(app)
require('./app/routes/news.routes')(app)
require('./app/routes/stocks.routes')(app)
app.use((req, res) => {
  res.status(404).send({
    error: '404 - not found'
  })
})

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