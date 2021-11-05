const axios = require('axios')
const cheerio = require('cheerio')

const sources = [
  {
    name: 'borsaitaliana',
    url: 'https://www.borsaitaliana.it/borsa/azioni/elenco-completo-notizie.html?isin=%isin%&lang=it',
    path: 'div.news li a.news'
  },
  {
    name: 'soldionline',
    url: 'https://www.soldionline.it/isin/%isin%',
    path: 'ul.isin-list li a.title'
  }
]


async function getNews(isin, media) {
  let newsObj = new Promise(function (resolve, reject) {
    const news = []
    let counter = 0  //TODO: Async forEach?
    let _sources = sources
    if(media) {
      _sources = sources.filter((src) => {
        return src.name === media
      })
    }
    _sources.forEach((source, index, array) => {
      axios.get(source.url.replace('%isin%', isin))
        .then((response) => {
          const html = response.data
          const $ = cheerio.load(html)
          $(source.path, html).each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')
            news.push({
              title,
              url
            })
          })
        })
        .catch((err) => {
          reject(err)
        })
        .finally(()=> {
          counter++
          if(counter === array.length) {
            resolve(news)
          }
        })
    })
  })
  return await newsObj 
}

// GET news by ISIN
exports.getByISIN = async (req, res) => {
  const isin = req.params.isin
  const news = await getNews(isin)
  return res.json(news)
}

// GET news by ISIN and source
exports.getByISINAndMedia = async (req, res) => {
  const isin = req.params.isin
  const media = req.params.media
  const news = await getNews(isin, media)
  return res.json(news)
}