const getData = require('./index')
const stocks = require('../configs/stocks.config')

// GET static stocks list
exports.getStocksList = async (req, res) => {
  const ligthStocks = []
  stocks.forEach((stock, i) => {
    ligthStocks[i] = {
      name: stock.name,
      code: stock.code,
      isin: stock.isin
    }
  })
  return res.json(ligthStocks)
}

//Stocks by analysis
exports.getByAnalysis = async (req, res, next) => {
  const analysis = req.params.analysis
  let stocks = []
  try {
    stocks = await getData.stocks(analysis, req.query)
  } catch (error) {
    return next(error)
  }
  return res.json(stocks)
}
