module.exports = app => {
  const info = require('../controllers/info.controller.js')
  const router = require('express').Router()

  //Stock info
  router.get('/:isin', info.getStockInfo)  

  //Stock info filtered by media
  //router.get('/:isin/:media', root.getStockInfoByMedia)

  //Stock info filtered by media and param
  //router.get('/:isin/:media/:param', root.getStockInfoByMediaAndParam)    

  app.use('/api/info', router)
}