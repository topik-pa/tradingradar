module.exports = app => {
  const custom = require('../controllers/custom.controller.js')
  const router = require('express').Router()

  //Golden Cross Up
  router.get('/', custom.getCustomData) 

  app.use('/api/custom', router)
}