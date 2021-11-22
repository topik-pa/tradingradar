module.exports = app => {
  const news = require('../controllers/news.controller.js')
  const router = require('express').Router()

  //Stock news
  router.get('/:isin', news.getByISIN)

  //Stock news filtered by media
  router.get('/:isin/:media', news.getByISINAndMedia)

  app.use('/api/news', router)
}