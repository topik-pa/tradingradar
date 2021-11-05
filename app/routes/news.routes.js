module.exports = app => {
  const news = require('../controllers/news.controller.js')
  const router = require('express').Router()

  router.get('/:isin', news.getByISIN)

  router.get('/:isin/:media', news.getByISINAndMedia)

  app.use('/api/news', router)
}