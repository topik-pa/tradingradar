const getData = require('./index')

// GET analysis by ISIN
exports.getByISIN = async (req, res) => {
  //return res.json({type: 'Stock generic info'})
  const isin = req.params.isin
  let analyses = {}
  try {
    analyses = await getData('analyses', isin)
  } catch (error) {
    return res.json({error: error.message})
  }
  return res.json(analyses)
}

// GET analysis by ISIN and source
exports.getByISINAndMedia = async (req, res) => {
  //return res.json({type: 'Stock generic info'})
  const isin = req.params.isin
  const media = req.params.media
  let analyses = {}
  try {
    analyses = await getData('analyses', isin, media)
  } catch (error) {
    return res.json({error: error.message})
  }
  return res.json(analyses)
}
