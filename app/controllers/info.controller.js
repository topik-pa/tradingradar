const getData = require('./index')

// GET stock generic info
exports.getStockInfo = async (req, res, next) => {
  const isin = req.params.isin
  let info = {}
  try {
    info = await getData.stock('info', isin)
  } catch (error) {
    return next(error)
  }
  return res.json(info)
}