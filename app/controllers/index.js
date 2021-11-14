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
  return {}
}

function getMFCodes (isin) {
  for(let i = 0; i < stocks.length; i++) {
    if(stocks[i].isin === isin) {
      const mf_code = stocks[i].mf_code
      return {
        mf_code,
        stockCodeRT: mf_code.substr(-4),
        marketCodeRT: mf_code.substr(0,3)
      }
    }
  }
  return {} //invalid isin
}

function removeWS (text) {
  text = text.replace(/\r?\n|\r/g, '').trim()
  if(text.length > 180) {
    text = text.substring(0, 180) + '...'
  }
  return text
}
function cleanResult(result, dirts) {
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
  const { mf_code, stockCodeRT, marketCodeRT } = getMFCodes(isin)

  //Build the returned object
  const requests = new Promise(function (resolve, reject) {
    let counter = 0
    let returnedObj = {}
    returnedObj.isin = isin
    returnedObj.sources = []
    _sources.forEach((source) => {
      if(!source[type] || source[type]?.length === 0) {
        counter++
        return
      }
      let url = source.url.replace('%isin%', isin).replace('%mf_code%', mf_code).replace('%stockCodeRT%', stockCodeRT).replace('%marketCodeRT%', marketCodeRT)
      axios.get(url)
        .then((response) => {
          if(type === 'news') {
            returnedObj.news = []
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
          } else {
            source[type].forEach(function(obj) {
              if(obj.type === 'html') {
                const html = response.data
                const $ = cheerio.load(html)
                returnedObj[obj.name] = removeWS(cleanResult($(obj.path).text(), obj.clean))
              }
              if(obj.type === 'json') {
                if(Array.isArray(response.data)) {
                  response.data.forEach(json => {
                    if(json[obj.path] === obj.value) {
                      returnedObj[obj.name] = removeWS(json[obj.target])
                    }
                  })
                } else {
                  const json = response.data
                  returnedObj[obj.name] = removeWS(json[obj.path])
                }
              }
              if(obj.type === 'text') {
                const text = response.data
                returnedObj[obj.name] = removeWS(text.split(obj.path[0])[obj.path[1]])
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