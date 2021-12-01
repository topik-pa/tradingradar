const axios = require('axios')
const cheerio = require('cheerio')
const stocks = require('../configs/stocks.config')
const sources = require('../configs/sources.config')
const availableStockAnalyses = require('../configs/analyses.config')

const db = require('../models')
const FTSEMibStock = db.ftseMibStocks

const SLEEP_TIME = 5000

//COMMON
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/*Clean text*/
function removeWS (text) {
  if(!text) return
  text = text.replace(/\r?\n|\r/g, '').trim()
  if(text.length > 280) {
    text = text.substring(0, 280) + '...'
  }
  return text
}
function cleanResult(result, dirts) {
  if(!result) return
  if(dirts && dirts.length) {
    dirts.forEach((dirt) => {
      result = result.replace(dirt, '')
    })
  }
  return result
}
/*Clean text*/

function filterSourcesByMedia (media) {
  if (!media) return sources
  let _sources = sources.filter((source) => {
    return source.code === media
  })
  return _sources.length ? _sources : []
}

function getUrlCodes (isin) {
  for(let i = 0; i < stocks.length; i++) {
    if(stocks[i].isin === isin) {
      const name = stocks[i].name
      const mf_code = stocks[i].mf_code
      const symbol = `${stocks[i].code}:IM`
      const code = stocks[i].code
      const teleb_code = stocks[i].teleb_code
      return {
        name,
        isin,
        code,
        mf_code,
        stockCodeRT: mf_code.substr(-4),
        marketCodeRT: mf_code.substr(0,3),
        symbol,
        teleb_code
      }
    }
  }
  return {}
}

function urlStringReplacer(url, codes) {
  for (const code in codes) {
    url = url.replace(`%${code}%`, codes[code])
  }
  return url
}


//STOCK
function appendNewsToResult (data, newsData, result) {
  if(newsData.type === 'json') {
    if(!Array.isArray(data)) return
    const json = data
    json.forEach(_json => {
      const title = _json[newsData.title]
      const url = _json[newsData.url]
      result.push(
        {
          title: title,
          url: newsData.domain ? newsData.domain + url : url
        }
      )
    })
  } else {
    const html = data
    const $ = cheerio.load(html)
    $(newsData.path, html).each(function() {
      const title = $(this).text()
      const url = $(this).attr('href')
      result.push({
        title: removeWS(title),
        url: newsData.domain ? newsData.domain + url : url
      })
    })
  }
}

function extractFromData (data, obj) {
  if(obj.type === 'html') {
    const html = data
    const $ = cheerio.load(html)
    const value = obj.attribute ? $(obj.path).attr(obj.attribute) : $(obj.path).text()
    return value ? removeWS(cleanResult(value, obj.clean)) : ''
  }
  if(obj.type === 'json') {
    let value = ''
    if(Array.isArray(data)) {
      data.forEach(json => {
        if(json[obj.path] === obj.value) {
          value = removeWS(json[obj.target])
        }
      })
    } else {
      const json = data
      value = removeWS(json[obj.path])
    }
    return value
  }
  if(obj.type === 'text') {
    const text = data
    return removeWS(text.split(obj.path[0])[obj.path[1]]) || ''
  }
}


//STOCKS
function getCriteriaObjData (criteria) {
  for (let x =0; x<sources.length; x++) {
    let source = sources[x]
    if(source.info.length) {
      for (let y=0; y<source.info.length; y++) {
        let info = source.info[y]
        if (info.name === criteria) {
          return {
            url: source.url,
            criteria: info
          }
        } 
      }
    }
    if(source.analyses.length) {
      for (let y=0; y<source.analyses.length; y++) {
        let analysis = source.analyses[y]
        if (analysis.name === criteria) {
          return {
            url: source.url,
            criteria: analysis
          }
        } 
      }
    }
    
  }
}

function toFloatNumber (str) {
  if(!str) return undefined
  return Number(parseFloat(str.replace(',', '.').replace('%', '')).toFixed(2))
}

function orderStocks (stocks, key, order='desc') {
  function compare( a, b ) {
    let {x, y} = {x: toFloatNumber(a[key].value), y: toFloatNumber(b[key].value)}
    if ( x > y ){
      return -1
    }
    if ( x < y ){
      return 1
    }
    return 0
  }
  function compareAsc( a, b ) {
    let {x, y} = {x: toFloatNumber(a[key].value), y: toFloatNumber(b[key].value)}
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

function sizeStocks (stocks, size) {
  return stocks.slice(0, size)
}

async function checkQueryParams (results, analysis, qps) {
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
    if(!isNaN(page) && !isNaN(size)) {
      results = pagingStocks(results, page, size)
    }
  }
  //Size
  if(qps.size) {
    let size = Number(qps.size)
    if(!isNaN(size)) {
      results = sizeStocks(results, size)
    }
  }
  return results
}

async function updateStockOnDB(stock) {
  const filter = { isin: stock.isin }
  const update = stock
  try {
    await FTSEMibStock.findOneAndUpdate(filter, update, {
      useFindAndModify: false, 
      runValidators: true,
      upsert: true
    })
  } catch (error) {
    console.error('Error updating DB data with last requested stock: ' + stock.isin + '.\n' + error)
  }
}



module.exports = {
  stock: async function (type, isin, media) { 
    //Filter the sources if media is set
    let _sources = filterSourcesByMedia(media)
    if(!_sources.length) {
      const err = new Error('Media code not found')
      err.status = 404
      throw err
    }
    //Get url codes
    const urlCodes = getUrlCodes(isin)
    if(!urlCodes.isin) {
      const err = new Error('ISIN code not found')
      err.status = 404
      throw err
    }
    //Setup the remote requests
    const requests = []
    let result
    if(type === 'news') {
      result = []
    } else {
      result = {}
      //result.sources = []
      result.isin = urlCodes.isin
      result.name = urlCodes.name
      result.code = urlCodes.code
    }
    _sources.forEach((source) => {
      if(!source[type] || source[type].length === 0 || Object.keys(source[type]).length === 0) {
        return
      }
      const request = new Promise(function (resolve, reject) {
        const url = urlStringReplacer(source.url, urlCodes)
        axios.get(url)
          .then((response) => {
            if(type === 'news') {
              //news
              appendNewsToResult(response.data, source.news, result)
            } else {
              //info/analysis
              /* if(source[type] && source[type].length) {
                result.sources.push(url)
              } */
              source[type].forEach(function(obj) {
                const key = ( type === 'info' || media ) ? obj.name : source.code + '_' + obj.name
                result[key] = {
                  value: extractFromData(response.data, obj),
                  source: url
                }
              })
            }
            console.info(`Done: ${url}`)
            resolve()
          })
          .catch((err) => {
            const errorMsg = 'Error performing remote request: ' + url + '\n' + err
            console.error(errorMsg)
            reject(errorMsg)
          })
      })
      requests.push(request)
    })
    //Wait the remote requests to be finished
    await Promise.allSettled(requests)
    //Save on DB
    if(type !== 'news') {
      updateStockOnDB(result)
    }
    //Return result
    return result
  },

  stocks: async function (analysis, qps) {
    //Is analysis a valid parameter
    let validReqAnalysis = false
    for(let i = 0; i<availableStockAnalyses.length; i++) {
      if(availableStockAnalyses[i].qp === analysis) {
        validReqAnalysis = true
        analysis = availableStockAnalyses[i].jsonKey
      }
    }
    if(!validReqAnalysis) {
      const err = new Error('Cant\'t find any content that conforms to the given criteria')
      err.status = 406
      throw err
    }
    //Setup the remote requests
    const results = []
    for (let i = 0; i < stocks.length; i++) {
      const stock = stocks[i]
      const dbStock = await FTSEMibStock.findOne({ isin: stock.isin })
      if(dbStock) {
        const result = {}
        result.isin = dbStock.isin
        result.name = dbStock.name
        result[analysis] = {}
        if(dbStock[analysis]) { //TODO... else get from Web
          result[analysis].value = dbStock[analysis].value
          result[analysis].source = dbStock[analysis].source
        }
        results.push(result)
        console.info(`Done: ${stock.name}`)
      } else {
        console.error('Cant\'t find stock ' + stock.isin + ' on DB')
      }
    }
    //Return results with qps elaboration
    return checkQueryParams(results, analysis, qps)
  },

  cronStocks: async function (analysis) {
    //Get the url and the criteria to perform
    const { url, criteria } = getCriteriaObjData(analysis.qp)
    //Setup the remote requests
    const results = []
    const requests = []
    for(let i = 0; i<stocks.length; i++) {
      let stock = stocks[i]
      //Get url codes
      const urlCodes = getUrlCodes(stock.isin)
      const request = new Promise(function (resolve, reject) {
        const actualUrl = urlStringReplacer(url, urlCodes)
        axios.get(actualUrl)
          .then((response) => {
            const result = {
              isin: stock.isin,
              name: stock.name,
              [analysis.jsonKey]: {
                value: extractFromData(response.data, criteria),
                source: actualUrl
              }
            }
            results.push(result)
            console.info(`Done: ${analysis.qp} - ${stock.name} - ${actualUrl}`)
            resolve()
          })
          .catch((err) => {
            const errorMsg = 'Error performing remote request: ' + actualUrl + '\n' + err
            console.error(errorMsg)
            reject(errorMsg)
          })
      })
      requests.push(request)
      await sleep(SLEEP_TIME)
    }

    //Wait for all requests to be finished
    await Promise.allSettled(requests)
      .then((results) => {
        console.log('*** START REPORT ***')
        results.forEach((result) => {
          console.log(result.status)
        })
        console.log('*** END REPORT ***')
      })
      .catch((err) => {
        console.err('ERRORE:')
        console.err(err)
      })

    //Return results
    return results
  }
}