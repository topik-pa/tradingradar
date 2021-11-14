const getData = require('./index')

// GET stock generic info
exports.getStockInfo = async (req, res) => {
  //return res.json({type: 'Stock generic info'})
  const isin = req.params.isin
  let info = {}
  try {
    info = await getData('info', isin)
  } catch (error) {
    return res.json({error: error.message})
  }
  return res.json(info)
}

// GET stock info filtered by media
/*exports.getStockInfoByMedia = async (req, res) => {
  //return res.json({type: 'Stock generic info by media'})
  const isin = req.params.isin
  const media = req.params.media
  let info = {}
  try {
    info = await getInfo(isin, media)
  } catch (error) {
    return res.json({error: error.message})
  }
  return res.json(info)
}*/

// GET stock info filtered by media and param
/*exports.getStockInfoByMediaAndParam = async (req, res) => {
  return res.json({type: 'Stock generic info by media and param'})
}*/