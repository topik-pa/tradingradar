const getData = require('./index')

// GET news by ISIN
exports.getByISIN = async (req, res) => {
  const isin = req.params.isin
  const news = await getData('news', isin)
  return res.json(news)
}

// GET news by ISIN and source
exports.getByISINAndMedia = async (req, res) => {
  const isin = req.params.isin
  const media = req.params.media
  const news = await getData('news', isin, media)
  return res.json(news)
}