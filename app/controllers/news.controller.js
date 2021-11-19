const getData = require('./index')

// GET news by ISIN
exports.getByISIN = async (req, res, next) => {
  const isin = req.params.isin
  let news = {}
  try {
    news = await getData.stock('news', isin)
  } catch (error) {
    return next(error)
  }
  return res.json(news)
}

// GET news by ISIN and source
exports.getByISINAndMedia = async (req, res, next) => {
  const isin = req.params.isin
  const media = req.params.media
  let news = {}
  try {
    news = await getData.stock('news', isin, media)
  } catch (error) {
    return next(error)
  }
  return res.json(news)
}