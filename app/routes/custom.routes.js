module.exports = app => {
  const custom = require('../controllers/custom.controller.js')
  const router = require('express').Router()

  //Golden Cross Up
  router.get('/goldencrossup', custom.getGoldenCrossUp) 
  
  //Golden Cross Down
  router.get('/goldencrossdown', custom.getGoldenCrossDown)

  app.use('/api/custom', router)
}