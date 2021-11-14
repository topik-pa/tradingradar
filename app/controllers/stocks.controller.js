const stocks = require('../configs/stocks.config')

// GET static stocks list
exports.getStocksList = async (req, res) => {
  return res.json(stocks)
}

//Stocks by analysis
exports.getByAnalysis = async (req, res) => {
  return res.json({type: 'Stocks by analysis type'})
}
