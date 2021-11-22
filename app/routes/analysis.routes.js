module.exports = app => {
  const analysis = require('../controllers/analysis.controller.js')
  const router = require('express').Router()

  //Stock analyses
  router.get('/:isin', analysis.getByISIN)

  //Stock analyses filtered by media
  router.get('/:isin/:media', analysis.getByISINAndMedia)

  app.use('/api/analysis', router)
}