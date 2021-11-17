const axios = require('axios')
const cheerio = require('cheerio')
const stocks = require('../configs/stocks.config')
const sources = require('../configs/sources.config')

function getSourceData (name) {
  for (let x =0; x<sources.length; x++) {
    let source = sources[x]
    if(source.info.length) {
      for (let y=0; y<source.info.length; y++) {
        let info = source.info[y]
        if (info.name === name) {
          return {
            url: source.url,
            obj: info
          }
        } 
      }
    }
    if(source.analyses.length) {
      for (let y=0; y<source.analyses.length; y++) {
        let analysis = source.analyses[y]
        if (analysis.name === name) {
          return {
            url: source.url,
            obj: analysis
          }
        } 
      }
    }
    
  }
}

function removeWS (text) {
  if(!text) return
  text = text.replace(/\r?\n|\r/g, '').trim()
  if(text.length > 180) {
    text = text.substring(0, 180) + '...'
  }
  return text
}

function toFloatNumber (str) {
  if(!str) return undefined
  return Number(parseFloat(str.replace(',', '.').replace('%', '')).toFixed(2))
}

function checkISINgetMFCodesgetSymbol (isin) {
  for(let i = 0; i < stocks.length; i++) {
    if(stocks[i].isin === isin) {
      const mf_code = stocks[i].mf_code
      const symbol = `${stocks[i].code}:IM`
      const code = stocks[i].code
      return {
        code,
        mf_code,
        stockCodeRT: mf_code.substr(-4),
        marketCodeRT: mf_code.substr(0,3),
        symbol
      }
    }
  }
  return {}
}

async function getStocks (analysis) {
  const { url, obj } = getSourceData(analysis)
  const requests = new Promise(function (resolve, reject) {
    let counter = 0
    let returnedStocks = []
    stocks.forEach((stock) => {
      //Get the query param codes
      const { code, mf_code, stockCodeRT, marketCodeRT, symbol} = checkISINgetMFCodesgetSymbol(stock.isin)
      if(!mf_code) return {} //Wrong ISIN
      let actualUrl = url.replace('%code%', code).replace('%isin%', stock.isin).replace('%mf_code%', mf_code).replace('%stockCodeRT%', stockCodeRT).replace('%marketCodeRT%', marketCodeRT).replace('%symbol%', symbol)
      axios.get(actualUrl)
        .then((response) => {
          if(obj.type === 'html') {
            const html = response.data
            const $ = cheerio.load(html)
            returnedStocks.push({
              isin: stock.isin,
              name: stock.name,
              [analysis]: removeWS($(obj.path).text())
            })
          }
          if(obj.type === 'json') {
            if(Array.isArray(response.data)) {
              response.data.forEach(json => {
                if(json[obj.path] === obj.value) {
                  returnedStocks.push({
                    isin: stock.isin,
                    name: stock.name,
                    [analysis]: json[obj.target]
                  })
                }
              })
            } else {
              const json = response.data
              returnedStocks.push({
                isin: stock.isin,
                name: stock.name,
                [analysis]: json[obj.target]
              })
            }
          }
        })
        .catch((err) => {
          reject(err)
        })
        .finally(()=> {
          counter++
          if(counter === stocks.length) {
            resolve(returnedStocks)
          }
        })
    })
  })
  return await requests
}

function orderStocks (stocks, key, order='desc') {
  function compare( a, b ) {
    let {x, y} = {x: toFloatNumber(a[key]), y: toFloatNumber(b[key])}
    if ( x > y ){
      return -1
    }
    if ( x < y ){
      return 1
    }
    return 0
  }
  function compareAsc( a, b ) {
    let {x, y} = {x: toFloatNumber(a[key]), y: toFloatNumber(b[key])}
    if ( x < y ){
      return -1
    }
    if ( x > y ){
      return 1
    }
    return 0
  }
  return order === 'desc' ? stocks.sort(compare) : stocks.sort(compareAsc)
}

function filterStocks (stocks, key, filter, value) {
  if(filter === 'gt') {
    return stocks.filter((stock) => {
      let tryNumber = parseFloat(stock[key])
      return !isNaN(tryNumber) ? tryNumber >= value : true
    })
  }
  if(filter === 'lt') {
    return stocks.filter((stock) => {
      let tryNumber = parseFloat(stock[key])
      return !isNaN(tryNumber) ? tryNumber <= value : true
    })
  }
  
}

function pagingStocks (stocks, page, size) {
  let intervals = []
  intervals[0] = size * (page - 1)
  intervals[1] = intervals[0] + size
  return stocks.slice(intervals[0], intervals[1])
}

async function checkQueryParams(analysis, qps) {
  if (!['perf1M', 'perf6M', 'perf1Y', 'volatility', 'rsi', 'divYield', 'lastDiv', 'mfRisk', 'rsi'].includes(analysis)) return {}  //'rating' 'lastDivDate' TODO:return error - error management + check name of params + add string analysis
  let results = await getStocks(analysis)
  if(!qps) return results

  //Filtering
  if(qps.gt && !isNaN(qps.gt)) {
    results = filterStocks(results, analysis, 'gt', qps.gt)
  }
  if(qps.lt && !isNaN(qps.lt)) {
    results = filterStocks(results, analysis, 'lt', qps.lt)
  }
  //Sorting
  if(qps.order === 'desc' || qps.order === 'asc') {
    results = orderStocks(results, analysis, qps.order)
  }
  //Paging
  if(qps.page && qps.size) {
    let page = Number(qps.page)
    let size = Number(qps.size)
    if(isNaN(page) || isNaN(size)) {
      return {}
    }
    results = pagingStocks(results, page, size)
  }
  
  return results
}

// GET static stocks list
exports.getStocksList = async (req, res) => {
  return res.json(stocks)
}

//Stocks by analysis
exports.getByAnalysis = async (req, res) => {
  //return res.json({type: 'Stocks by analysis type'})
  const analysis = req.params.analysis
  let stocks = {}
  try {
    stocks = await checkQueryParams(analysis, req.query)
  } catch (error) {
    return res.json({error: error.message})
  }
  return res.json(stocks)
}
