const axios = require('axios')
const cheerio = require('cheerio')
const stocks = require('../configs/stocks.config')
const sources = require('../configs/sources.config')
const availableStockAnalyses = require('../configs/analyses.config')

const db = require('../models')
const FTSEMibStock = db.ftseMibStocks

const SLEEP_TIME = 13000

//COMMON
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/*Clean text*/
function removeWS(text) {
  if (!text) return
  text = text.replace(/\r?\n|\r/g, '').trim()
  if (text.length > 280) {
    text = text.substring(0, 280) + '...'
  }
  return text
}
function cleanResult(result, dirts) {
  if (!result) return
  /*if(dirts && dirts.length) {
    dirts.forEach((dirt) => {
      result = result.replace(dirt, '')
    })
  }*/
  if (dirts && dirts[0]) {
    let leftIndex = result.indexOf(dirts[0])
    result = result.substring(leftIndex + dirts[0].length)
  }
  if (dirts && dirts[1]) {
    let rightIndex = result.indexOf(dirts[1])
    result = result.substring(0, rightIndex)
  }
  return result
}
/*Clean text*/

function filterSourcesByMedia(media) {
  if (!media) return sources
  let _sources = sources.filter((source) => {
    return source.code === media
  })
  return _sources.length ? _sources : []
}

function getUrlCodes(isin) {
  for (let i = 0; i < stocks.length; i++) {
    if (stocks[i].isin === isin) {
      const name = stocks[i].name
      const mf_code = stocks[i].mf_code
      const symbol = `${stocks[i].code}:IM`
      const code = stocks[i].code
      const lowerCaseCode = stocks[i].code.toLowerCase()
      const teleb_code = stocks[i].teleb_code
      return {
        name,
        isin,
        code,
        lowerCaseCode,
        mf_code,
        stockCodeRT: mf_code.substr(-4),
        marketCodeRT: mf_code.substr(0, 3),
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
function appendNewsToResult(data, newsData, result) {
  if (newsData.type === 'json') {
    if (!Array.isArray(data)) return
    const json = data
    json.forEach((_json) => {
      const title = _json[newsData.title]
      const url = _json[newsData.url]
      result.push({
        title: title,
        url: newsData.domain ? newsData.domain + url : url
      })
    })
  } else {
    const html = data
    const $ = cheerio.load(html)
    $(newsData.path, html).each(function () {
      const title = $(this).text()
      const url = $(this).attr('href')
      result.push({
        title: removeWS(title),
        url: newsData.domain ? newsData.domain + url : url
      })
    })
  }
}

function extractFromData(data, obj) {
  if (obj.type === 'html') {
    const html = data
    const $ = cheerio.load(html)
    if (Array.isArray(obj.path)) {
      let values = []
      obj.path.forEach((p) => {
        values.push(removeWS($(p).text()))
      })
      return values
    } else {
      const value = obj.attribute
        ? $(obj.path).attr(obj.attribute)
        : $(obj.path).text() !== ''
          ? $(obj.path).text()
          : $(obj.path).html()
      return value ? removeWS(cleanResult(value, obj.clean)) : ''
    }
  }
  if (obj.type === 'json') {
    let value = ''
    if (Array.isArray(data)) {
      data.forEach((json) => {
        if (json[obj.path] === obj.value) {
          value = removeWS(json[obj.target])
        }
      })
    } else {
      const json = data
      value = removeWS(json[obj.path])
    }
    return value
  }
  if (obj.type === 'text') {
    const text = data
    return removeWS(text.split(obj.path[0])[obj.path[1]]) || ''
  }
}

//STOCKS
function getCriteriaObjData(criteria) {
  for (let x = 0; x < sources.length; x++) {
    let source = sources[x]
    if (source.info.length) {
      for (let y = 0; y < source.info.length; y++) {
        let info = source.info[y]
        if (info.name === criteria) {
          return {
            url: source.url,
            criteria: info
          }
        }
      }
    }
    if (source.analyses.length) {
      for (let y = 0; y < source.analyses.length; y++) {
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

function toFloatNumber(str) {
  if (str === undefined || str === null) return str
  if (!isNaN(str)) return str
  if (typeof str === 'string') {
    let tryNum = Number(
      parseFloat(str.toString().replace(',', '.').replace('%', '')).toFixed(2)
    )
    if (isNaN(tryNum)) return str
    return tryNum
  }
  return str
}

function toUnivDateValue(str) {
  if (str === undefined || str === null) return str
  if (new Date(str).toString() !== 'Invalid Date') {
    return new Date(str).getTime()
  }
  return ''
}

function fromLastDivDateDateToUnivDate(str) {
  if (str === undefined || str === null) return str
  let array = str.split('/')
  let day = array[0]
  array[0] = array[1]
  array[1] = day
  const date = array.join('/')
  if (new Date(date).toString() !== 'Invalid Date') {
    return new Date(date).getTime()
  }
  return ''
}

function orderStocks(stocks, key, order = 'desc') {
  function compare(a, b) {
    const valX = (key === 'lastDivDate') ? fromLastDivDateDateToUnivDate(a[key].value) : (key === 'lastJudgment') ? toUnivDateValue(a[key].value) : toFloatNumber(a[key].value) 
    const valY = (key === 'lastDivDate') ? fromLastDivDateDateToUnivDate(b[key].value) : (key === 'lastJudgment') ? toUnivDateValue(b[key].value) : toFloatNumber(b[key].value) 
    let { x, y } = {
      x: valX,
      y: valY
    }
    if (x > y) {
      return -1
    }
    if (x < y) {
      return 1
    }
    return 0
  }
  function compareAsc(a, b) {
    const valX = (key === 'lastDivDate') ? fromLastDivDateDateToUnivDate(a[key].value) : (key === 'lastJudgment') ? fromLastDivDateDateToUnivDate(a[key].value) : toFloatNumber(a[key].value) 
    const valY = (key === 'lastDivDate') ? fromLastDivDateDateToUnivDate(b[key].value) : (key === 'lastJudgment') ? fromLastDivDateDateToUnivDate(b[key].value) : toFloatNumber(b[key].value) 
    let { x, y } = {
      x: valX,
      y: valY
    }
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  }
  return order === 'desc' ? stocks.sort(compare) : stocks.sort(compareAsc)
}

function filterStocks(stocks, key, filter, value) {
  if (filter === 'gt') {
    return stocks.filter((stock) => {
      let tryNumber = parseFloat(stock[key])
      return !isNaN(tryNumber) ? tryNumber >= value : true
    })
  }
  if (filter === 'lt') {
    return stocks.filter((stock) => {
      let tryNumber = parseFloat(stock[key])
      return !isNaN(tryNumber) ? tryNumber <= value : true
    })
  }
}

function pagingStocks(stocks, page, size) {
  let intervals = []
  intervals[0] = size * (page - 1)
  intervals[1] = intervals[0] + size
  return stocks.slice(intervals[0], intervals[1])
}

function sizeStocks(stocks, size) {
  return stocks.slice(0, size)
}

async function checkQueryParams(results, analysis, qps) {
  if (!qps) return results

  //Filtering
  if (qps.gt && !isNaN(qps.gt)) {
    results = filterStocks(results, analysis, 'gt', qps.gt)
  }
  if (qps.lt && !isNaN(qps.lt)) {
    results = filterStocks(results, analysis, 'lt', qps.lt)
  }
  //Sorting
  if (qps.order === 'desc' || qps.order === 'asc') {
    results = orderStocks(results, analysis, qps.order)
  }
  //Paging
  if (qps.page && qps.size) {
    let page = Number(qps.page)
    let size = Number(qps.size)
    if (!isNaN(page) && !isNaN(size)) {
      results = pagingStocks(results, page, size)
    }
  }
  //Size
  if (qps.size) {
    let size = Number(qps.size)
    if (!isNaN(size)) {
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
    console.error(
      'Error updating DB data with last requested stock: ' +
        stock.isin +
        '.\n' +
        error
    )
  }
}

module.exports = {
  stock: async function (type, isin, media) {
    //Filter the sources if media is set
    let _sources = filterSourcesByMedia(media)
    if (!_sources.length) {
      const err = new Error('Media code not found')
      err.status = 404
      throw err
    }
    //Get url codes
    const urlCodes = getUrlCodes(isin)
    if (!urlCodes.isin) {
      const err = new Error('ISIN code not found')
      err.status = 404
      throw err
    }
    //Setup the remote requests
    const requests = []
    let result
    if (type === 'news') {
      result = []
    } else {
      result = {}
      //result.sources = []
      result.isin = urlCodes.isin
      result.name = urlCodes.name
      result.code = urlCodes.code
    }
    _sources.forEach((source) => {
      if (
        !source[type] ||
        source[type].length === 0 ||
        Object.keys(source[type]).length === 0
      ) {
        return
      }
      const request = new Promise(function (resolve, reject) {
        const url = urlStringReplacer(source.url, urlCodes)
        const now = new Date().toLocaleString()
        axios
          .get(url)
          .then((response) => {
            if (type === 'news') {
              //news
              appendNewsToResult(response.data, source.news, result)
            } else {
              //info/analysis
              /* if(source[type] && source[type].length) {
                result.sources.push(url)
              } */
              source[type].forEach(function (obj) {
                const key =
                  type === 'info' || media
                    ? obj.name
                    : source.code + '_' + obj.name
                result[key] = {
                  value: obj.numeric
                    ? parseFloat(
                      extractFromData(response.data, obj).replace(',', '.')
                    )
                    : extractFromData(response.data, obj),
                  source: url,
                  now: now
                }
              })
            }
            console.info(`Done: ${url}`)
            resolve()
          })
          .catch((err) => {
            const errorMsg =
              'Error performing remote request: ' + url + '\n' + err
            console.error(errorMsg)
            reject(errorMsg)
          })
      })
      requests.push(request)
    })
    //Wait the remote requests to be finished
    await Promise.allSettled(requests)
    //Save on DB
    if (type !== 'news') {
      //PATCH
      let dataForDB = Object.create(result)
      delete dataForDB.volume
      //PATCH
      updateStockOnDB(dataForDB)
    }
    //Return result
    return result
  },

  stocks: async function (analysis, qps) {
    //Is analysis a valid parameter
    let validReqAnalysis = false
    for (let i = 0; i < availableStockAnalyses.length; i++) {
      if (availableStockAnalyses[i].qp === analysis) {
        validReqAnalysis = true
        analysis = availableStockAnalyses[i].jsonKey
      }
    }
    if (!validReqAnalysis) {
      const err = new Error(
        'Cant\'t find any content that conforms to the given criteria'
      )
      err.status = 406
      throw err
    }
    //Setup the remote requests
    const results = []
    for (let i = 0; i < stocks.length; i++) {
      const stock = stocks[i]
      const dbStock = await FTSEMibStock.findOne({ isin: stock.isin })
      if (dbStock) {
        const result = {}
        result.isin = dbStock.isin
        result.name = dbStock.name
        result[analysis] = {}
        if (dbStock[analysis]) {
          //TODO... else get from Web
          result[analysis].value = dbStock[analysis].value
          result[analysis].source = dbStock[analysis].source
          result[analysis].now = dbStock[analysis].now
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
    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i]
      //Get url codes
      const urlCodes = getUrlCodes(stock.isin)
      const request = new Promise(function (resolve, reject) {
        const actualUrl = urlStringReplacer(url, urlCodes)
        const now = new Date().toLocaleString()
        axios
          .get(actualUrl)
          .then((response) => {
            const result = {
              isin: stock.isin,
              name: stock.name,
              [analysis.jsonKey]: {
                value: criteria.numeric
                  ? parseFloat(
                    extractFromData(response.data, criteria).replace(',', '.')
                  )
                  : extractFromData(response.data, criteria),
                source: actualUrl,
                now: now
              }
            }
            results.push(result)
            console.info(`Done: ${analysis.qp} - ${stock.name} - ${actualUrl}`)
            resolve()
          })
          .catch((err) => {
            const errorMsg =
              'Error performing remote request: ' + actualUrl + '\n' + err
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
