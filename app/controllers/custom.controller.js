const db = require('../models')
const FTSEMibStock = db.ftseMibStocks

// GET Golden Cross Up
exports.getGoldenCrossUp = async (req, res, next) => {
  let custom = {}
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$mm20days.value', '$mm40days.value']}} ]} )
    let result = 0
    let delta = Infinity
    results.forEach((stock, i) => {
      let currDelta = stock.mm20days.value - stock.mm40days.value
      if( currDelta < delta) {
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

// GET Golden Cross Down
exports.getGoldenCrossDown = async (req, res, next) => {
  let custom = {}
  try {
    const results = await FTSEMibStock.find( {$expr: {$lt: ['$mm40days.value', '$mm20days.value']}} )
    let result = 0
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