const db = require('../models')
const FTSEMibStock = db.ftseMibStocks

// GET volume spike
exports.getGoldenCross = async (req, res, next) => {
  let custom = {}
  try {
    const results = await FTSEMibStock.find( {$expr: {$lt: ['$mm40days.value', '$mm20days.value']}} )
    let result
    let delta = 0
    results.forEach((stock, i) => {
      let currDelta = stock.lastPrice.value - stock.mm20days.value
      if( currDelta > delta) {
        delta = currDelta
        result = results[i]
      }
    })
    custom = result
  } catch (error) {
    return next(error)
  }
  return res.json(custom)
}