const getData = require('./index')

// GET analysis by ISIN
exports.getByISIN = async (req, res, next) => {
  const isin = req.params.isin
  let analyses = {}
  try {
    analyses = await getData.stock('analyses', isin)
  } catch (error) {
    return next(error)
  }
  return res.json(analyses)
}

// GET analysis by ISIN and source
exports.getByISINAndMedia = async (req, res, next) => {
  const isin = req.params.isin
  const media = req.params.media
  let analyses = {}
  try {
    analyses = await getData.stock('analyses', isin, media)
  } catch (error) {
    return next(error)
  }
  return res.json(analyses)
}
