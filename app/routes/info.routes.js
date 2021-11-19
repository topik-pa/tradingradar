module.exports = app => {
  const info = require('../controllers/info.controller.js')
  const router = require('express').Router()

  //Stock info
  router.get('/:isin', info.getStockInfo)   

  app.use('/api/info', router)
}