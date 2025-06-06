const express = require('express')
const cors = require('cors')
const http = require('http')
const cron = require('node-cron')
const schedule = require('./app/configs/cron.config')
const updateStocksDB = require('./app/scripts/updateStocksDB')
require('dotenv').config()

const app = express()

// Set CORS
const allowlist = ['http://localhost:8081', 'https://tradingradar-v3-gui-staging.herokuapp.com', 'https://tradingradar-v3-gui.herokuapp.com', 'https://www.tradingradar.net', 'http://www.tradingradar.net', 'http://tradingradar.net', 'https://tradingradar.net']
var corsOptions = {
  origin: allowlist,
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
    console.log('Connected to the database:', db.url)
    const FTSEMibStock = db.ftseMibStocks
    const User = db.users
    cron.schedule(schedule.cron, () => {
      updateStocksDB(FTSEMibStock)
    })

    //FOLLOW THE TITLE
    require('./app/scripts/ftt/ftt')(User, FTSEMibStock)
    
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

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
require('./app/routes/custom.routes')(app)
app.use((req, res) => {
  res.status(404).send({
    error: 404,
    message: 'Resource not found'
  })
})

//Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    error: err.status || 500,
    message: err.message
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
const port = process.env.PORT || 8080
http.createServer(app).listen(port, () => {
  console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode.\nAccepting requests from ${allowlist}.`)
})

module.exports = app