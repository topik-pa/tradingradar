module.exports = [
  {
    id: 0,
    code: 'borsa-italiana',
    name: 'Borsa Italiana',
    url: 'https://www.borsaitaliana.it/borsa/azioni/scheda/%isin%.html?lang=it',
    info: [
      {
        name: 'name',
        type: 'html',
        path: '.-size-xlg > a'
      },
      {
        name: 'code',
        type: 'html',
        path: '.cnt-summary > div:nth-of-type(4) > article > div > div:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > span'
      },
      {
        name: 'perf1M',
        type: 'html',
        path: '.cnt-summary > div:nth-of-type(4) > article > div > div:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > span'
      },
      {
        name: 'perf6M',
        type: 'html',
        path: '.cnt-summary > div:nth-of-type(4) > article > div > div:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > span'
      },
      {
        name: 'perf1Y',
        type: 'html',
        path: '.cnt-summary > div:nth-of-type(4) > article > div > div:nth-of-type(2) > div:nth-of-type(2) > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > span'
      }
    ],
    analyses: []
  },
  {
    id: 1,
    code: 'borsa-italiana',
    name: 'Borsa Italiana',
    url: 'https://www.borsaitaliana.it/borsa/azioni/analisi-tecnica.html?isin=%isin%&lang=it',
    info: [
      {
        name: 'volatility',
        type: 'html',
        path: '.m-table > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > span > strong'
      }
    ],
    analyses: [
      {
        name: 'support',
        type: 'html',
        path: 'span.-dato_techanalSup strong'
      },
      {
        name: 'resistance',
        type: 'html',
        path: 'span.-dato_techanalRes strong'
      },
      {
        name: 'rsi',
        type: 'html',
        path: '.m-table > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > span > strong'
      },
      {
        name: 'evaluation',
        type: 'html',
        path: '.cnt-summary > div:nth-of-type(4) > article:nth-of-type(3) > div > div'
      }
    ]
  },
  {
    id: 2,
    code: 'borsa-italiana',
    name: 'Borsa Italiana',
    url: 'https://www.borsaitaliana.it/borsa/azioni/elenco-completo-notizie.html?isin=%isin%&lang=it',
    info: [],
    analyses: [],
    news: {
      type: 'html',
      path: 'div.news li a.news',
      domain: 'https://www.borsaitaliana.it'
    }
  },
  {
    id: 3,
    code: 'milano-finanza',
    name: 'Milano Finanza',
    url: 'https://www.milanofinanza.it/Mercati/GetQuotazioni?codice=%mf_code%',
    info: [
      {
        name: 'divYield',
        type: 'json',
        path: 'Code',
        value: '015e',
        target: 'Campo'
      },
      {
        name: 'lastDiv',
        type: 'json',
        path: 'Code',
        value: '0683',
        target: 'Campo'
      },
      {
        name: 'lastDivDate',
        type: 'json',
        path: 'Code',
        value: '0684',
        target: 'Campo'
      }
    ],
    analyses: [
      {
        name: 'mfRisk',
        type: 'json',
        path: 'Code',
        value: '0702',
        target: 'Campo'
      },
      {
        name: 'rsi',
        type: 'json',
        path: 'Code',
        value: '015f',
        target: 'Campo'
      }
    ]
  },
  {
    id: 4,
    code: 'milano-finanza',
    name: 'Milano Finanza',
    url: 'https://www.milanofinanza.it/Mercati/GetMFRating?marketCodeRT=%marketCodeRT%&stockCodeRT=%stockCodeRT%',
    info: [],
    analyses: [
      {
        name: 'mfRanking',
        type: 'text',
        path: ['|','0']
      }
    ]
  },
  {
    id: 5,
    code: 'soldionline',
    name: 'Soldionline',
    url: 'https://www.soldionline.it/quotazioni/dettaglio/%isin%.html',
    info: [
      {
        name: 'absMin',
        type: 'html',
        path: '.scheda-titolo > div:nth-of-type(10) > ul > li > div > div > div:nth-of-type(1)',
        clean: ['Minimo storico:']
      },
      {
        name: 'absMax',
        type: 'html',
        path: '.scheda-titolo > div:nth-of-type(10) > ul > li > div > div > div:nth-of-type(2)',
        clean: ['Massimo storico:']
      },
      {
        name: 'currentYearMin',
        type: 'html',
        path: '.scheda-titolo > div:nth-of-type(10) > ul > li > div > div > div:nth-of-type(3)',
        clean: ['Minimo anno corrente:']
      },
      {
        name: 'currentYearMax',
        type: 'html',
        path: '.scheda-titolo > div:nth-of-type(10) > ul > li > div > div > div:nth-of-type(4)',
        clean: ['Massimo anno corrente:']
      }
    ],
    analyses: [],
    news: {
      type: 'html',
      path: '.news-list-azioni > li > a'
    }
  }
]