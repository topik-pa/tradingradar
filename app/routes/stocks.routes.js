module.exports = app => {
  const stocks = require('../controllers/stocks.controller.js')
  const router = require('express').Router()

  //Static stock list
  router.get('/', stocks.getStocksList)

  //Stocks by analysis (with query params)
  router.get('/:analysis', stocks.getByAnalysis)

  app.use('/api/stocks', router)
}