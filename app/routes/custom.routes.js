module.exports = app => {
  const custom = require('../controllers/custom.controller.js')
  const router = require('express').Router()

  //Stock info
  router.get('/goldencross', custom.getGoldenCross)   

  app.use('/api/custom', router)
}