const db = require('../models')
const FTSEMibStock = db.ftseMibStocks



exports.getCustomData = async (req, res, next) => {
  let custom = {}

  // GET Golden Cross Up
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$gt: ['$mm20days.value', '$mm40days.value']}} ]} )
    let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 2
    results.forEach((stock) => {
      let currDeltaPerc = (stock.mm20days.value - stock.mm40days.value) / (stock.mm40days.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.gcup = returnings.sort( (a,b) => a.delta - b.delta )
  } catch (error) {
    return next(error)
  }

  // GET Golden Cross Down
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$lt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$lt: ['$mm20days.value', '$mm40days.value']}} ]} )
    let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 1.5
    results.forEach((stock) => {
      let currDeltaPerc = (stock.mm40days.value - stock.mm20days.value) / (stock.mm20days.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA  ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.gcdown = returnings.sort( (a,b) => a.delta - b.delta )
  } catch (error) {
    return next(error)
  }

  // GET Up trends
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$gt: ['$lastPrice.value', '$mm40days.value']}}, {$expr: {$gt: ['$lastPrice.value', '$mm100days.value']}}, {$expr: {$gt: ['$mm20days.value', '$mm40days.value']}}, {$expr: {$gt: ['$mm40days.value', '$mm100days.value']}} ]}
    )
    custom.uptrends = results
  } catch (error) {
    return next(error)
  }

  // GET Down trends
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$lt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$lt: ['$lastPrice.value', '$mm40days.value']}}, {$expr: {$lt: ['$lastPrice.value', '$mm100days.value']}}, {$expr: {$lt: ['$mm20days.value', '$mm40days.value']}}, {$expr: {$lt: ['$mm40days.value', '$mm100days.value']}} ]}
    )
    custom.downtrends = results
  } catch (error) {
    return next(error)
  }

  // GET Trend inversion up
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$gt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$lt: ['$mm40days.value', '$mm100days.value']}} ]} )
    let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 1.5
    results.forEach((stock) => {
      let currDeltaPerc = (stock.lastPrice.value - stock.mm20days.value) / (stock.mm20days.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.tiup = returnings.sort( (a,b) => a.delta - b.delta )
  } catch (error) {
    return next(error)
  }

  // GET Trend inversion down
  try {
    const results = await FTSEMibStock.find( {$and: [ {$expr: {$lt: ['$lastPrice.value', '$mm20days.value']}}, {$expr: {$gt: ['$mm40days.value', '$mm100days.value']}} ]} )
    let returnings = []
    const MIN_DELTA = 0.5
    const MAX_DELTA = 1.5
    results.forEach((stock) => {
      let currDeltaPerc = (stock.mm20days.value - stock.lastPrice.value) / (stock.lastPrice.value / 100)
      if( currDeltaPerc >= MIN_DELTA && currDeltaPerc <= MAX_DELTA ) {
        stock.delta = currDeltaPerc
        returnings.push(stock)
      }
    })
    custom.tidown = returnings.sort( (a,b) => a.delta - b.delta )
  } catch (error) {
    return next(error)
  }


  return res.json(custom)
}
