const getData = require('./index')
const stocks = require('../configs/stocks.config')

// GET static stocks list
exports.getStocksList = async (req, res) => {
  return res.json(stocks)
}

//Stocks by analysis
exports.getByAnalysis = async (req, res, next) => {
  const analysis = req.params.analysis
  let stocks = {}
  try {
    stocks = await getData.stocks(analysis, req.query)
  } catch (error) {
    return next(error)
  }
  return res.json(stocks)
}
