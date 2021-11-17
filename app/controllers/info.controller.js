const getData = require('./index')

// GET stock generic info
exports.getStockInfo = async (req, res) => {
  const isin = req.params.isin
  let info = {}
  try {
    info = await getData('info', isin)
  } catch (error) {
    return res.json({error: error.message})
  }
  return res.json(info)
}