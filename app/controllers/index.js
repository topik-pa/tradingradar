const axios = require('axios')
const cheerio = require('cheerio')
const stocks = require('../configs/stocks.config')
const sources = require('../configs/sources.config')

function filterSourcesByMedia (media) {
  if (media === undefined) return sources
  let _sources = sources.filter((src) => {
    return src.code === media
  })
  if(_sources.length) {
    return _sources
  }
  return []
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

function removeWS (text) {
  if(!text) return
  text = text.replace(/\r?\n|\r/g, '').trim()
  if(text.length > 180) {
    text = text.substring(0, 180) + '...'
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

module.exports = async function getData(type, isin, media) {
  //Filter the sources if media is set
  let _sources = filterSourcesByMedia(media)

  //Get the query param codes
  const { code, mf_code, stockCodeRT, marketCodeRT, symbol} = checkISINgetMFCodesgetSymbol(isin)
  if(!mf_code) return {} //Wrong ISIN

  //Build the returned object
  const requests = new Promise(function (resolve, reject) {
    let counter = 0
    let returnedObj = {}
    returnedObj.isin = isin
    returnedObj.sources = []
    if (type === 'news') returnedObj.news = [] //TODO: better!
    _sources.forEach((source) => {
      if(!source[type] || source[type]?.length === 0) {
        counter++
        return
      }
      let url = source.url.replace('%code%', code).replace('%isin%', isin).replace('%mf_code%', mf_code).replace('%stockCodeRT%', stockCodeRT).replace('%marketCodeRT%', marketCodeRT).replace('%symbol%', symbol)
      axios.get(url)
        .then((response) => {
          if(type === 'news') {
            //news
            if(source.news.type === 'json') {
              //json
              if(Array.isArray(response.data)) {
                response.data.forEach(json => {
                  const title = json[source.news.title]
                  const url = json[source.news.url]
                  returnedObj.news.push({
                    title: title,
                    url: source.news.domain ? source.news.domain + url : url
                  })
                })
              }
            } else {
              //html
              const html = response.data
              const $ = cheerio.load(html)
              $(source.news.path, html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')
                returnedObj.news.push({
                  title: removeWS(title),
                  url: source.news.domain ? source.news.domain + url : url
                })
              })
            }
          } else {
            //info / analysis
            source[type].forEach(function(obj) {
              if(obj.type === 'html') {
                //html
                const html = response.data
                const $ = cheerio.load(html)
                returnedObj[`${source.code}_${obj.name}`] = obj.attribute ? removeWS(cleanResult($(obj.path).attr(obj.attribute), obj.clean)) : removeWS(cleanResult($(obj.path).text(), obj.clean))
              }
              if(obj.type === 'json') {
                //json
                if(Array.isArray(response.data)) {
                  response.data.forEach(json => {
                    if(json[obj.path] === obj.value) {
                      returnedObj[`${source.code}_${obj.name}`] = removeWS(json[obj.target])
                    }
                  })
                } else {
                  const json = response.data
                  returnedObj[`${source.code}_${obj.name}`] = removeWS(json[obj.path])
                }
              }
              //text
              if(obj.type === 'text') {
                const text = response.data
                returnedObj[`${source.code}_${obj.name}`] = removeWS(text.split(obj.path[0])[obj.path[1]])
              }
            })
          }
          returnedObj.sources.push(url)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(()=> {
          counter++
          if(counter === _sources.length) {
            resolve(returnedObj)
          }
        })
    })
  })

  return await requests
}