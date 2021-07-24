module.exports = app => {
  const public = require('../controllers/public.controller.js')
  const router = require('express').Router()

  //Login user
  router.get('/', public.index)
  router.get('/test', public.index)

  app.use('/api', router)

}