const availableStockAnalyses = require('../configs/analyses.config')
const getData = require('../controllers/index')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = async (stockModel) => {
  let stocks = []
  for(let i = 0; i<availableStockAnalyses.length; i++) {
    const analysis = availableStockAnalyses[i]
    //Get stock data from the Web
    try {      
      stocks = await getData.cronStocks(analysis)
    } catch (error) {
      console.error('Error retrieving data for analysis: ' + analysis.qp + '\n' + error)
    }
    //Save stock data on DB
    for(let i = 0; i<stocks.length; i++) {
      const stock = stocks[i]
      const filter = { isin: stock.isin }
      const update = {}
      update.name = stock.name
      update[analysis.jsonKey] = {}
      if(stock[analysis.jsonKey]) {
        update[analysis.jsonKey].value = stock[analysis.jsonKey].value
        update[analysis.jsonKey].source = stock[analysis.jsonKey].source
      }
      try {
        await stockModel.findOneAndUpdate(filter, update, {
          useFindAndModify: false, 
          runValidators: true,
          upsert: true
        })
      } catch (error) {
        console.error('Error saving data for analysis: ' + analysis.qp + '\n' + error)
      }
    }
    await sleep(5000)
  }
}