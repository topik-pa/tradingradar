module.exports = [
  {
    id: 0,
    code: 'borsaIt',
    name: 'Borsa Italiana',
    url: 'https://www.borsaitaliana.it/borsa/azioni/scheda/%isin%.html?lang=it',
    info: [
      {
        name: 'lastPrice',
        type: 'html',
        path: '.-black-warm-60 > strong'
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
    analyses: [],
    news: {}
  },
  {
    id: 1,
    code: 'borsaIt',
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
      },
      {
        name: 'rating',
        type: 'html',
        path: '.-md-5 .m-img',
        attribute: 'src',
        clean: ['/media/img/technicalanalysis/rank-fta', '.gif']
      }
    ],
    news: {}
  },
  {
    id: 2,
    code: 'borsaIt',
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
    code: 'milFin',
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
        name: 'mfRsi',
        type: 'json',
        path: 'Code',
        value: '015f',
        target: 'Campo'
      }
    ],
    news: {}
  },
  {
    id: 4,
    code: 'milFin',
    name: 'Milano Finanza',
    url: 'https://www.milanofinanza.it/Mercati/GetMFRating?marketCodeRT=%marketCodeRT%&stockCodeRT=%stockCodeRT%',
    info: [],
    analyses: [
      {
        name: 'mfRanking',
        type: 'text',
        path: ['|','0']
      }
    ],
    news: {}
  },
  {
    id: 5,
    code: 'milFin',
    name: 'Milano Finanza',
    url: 'https://www.milanofinanza.it/Mercati/BoxNewsTitolo?isin=%isin%&numNews=6',
    info: [],
    analyses: [],
    news: {
      type: 'json',
      title: 'TitoloNoHtml',
      url: 'UrlNews',
      domain: 'https://www.milanofinanza.it'
    }
  },
  {
    id: 6,
    code: 'sol',
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
  },
  {
    id: 7,
    code: 'rep',
    name: 'La Repubblica - Finanza e Mercati',
    url: 'https://finanza.repubblica.it/Company/?symbol=%symbol%',
    info: [
      {
        name: 'webSite',
        type: 'html',
        path: '#ctl00_ContentLeft_companyContact_linkWebSite'
      },
      {
        name: 'address',
        type: 'html',
        path: '#ctl00_ContentLeft_companyContact_lblIndirizzo'
      }
    ],
    analyses: [],
    news: {
      type: 'html',
      path: '.news-item a'
    }
  },
  {
    id: 8,
    code: 'sol24',
    name: 'Il Sole 24 Ore',
    url: 'https://vwd-proxy.ilsole24ore.com/FinanzaMercati/WidgetSelector/header-dettaglio?topicName=%code%.MI',
    info: [
      {
        name: 'profile',
        type: 'html',
        path: '.fmw-panel-description > p'
      }
    ],
    analyses: [],
    news: {}
  },
  {
    id: 9,
    code: 'sol24',
    name: 'Il Sole 24 Ore',
    url: 'https://vwd-proxy.ilsole24ore.com/FinanzaMercati/WidgetSelector/box-commento?widgetConfiguration=BoxCommentoBilancioSintetico&topicName=%code%.MI',
    info: [
      {
        name: 'comment',
        type: 'html',
        path: '#rmjs-2 > p'
      }
    ],
    analyses: [],
    news: {}
  },
  {
    id: 10,
    code: 'sol24',
    name: 'Il Sole 24 Ore',
    url: 'https://vwd-proxy.ilsole24ore.com/FinanzaMercati/WidgetSelector/analisi-tecnica-dettaglio?topicName=%code%.MI&device=Desktop',
    info: [
      {
        name: 'mm20days',
        type: 'html',
        path: '.left .boxDettaglioColumn > tbody > tr:nth-of-type(1) > td:nth-of-type(2)'
      },
      {
        name: 'mm40days',
        type: 'html',
        path: '.left .boxDettaglioColumn > tbody > tr:nth-of-type(2) > td:nth-of-type(2)'
      },
      {
        name: 'mm100days',
        type: 'html',
        path: '.left .boxDettaglioColumn > tbody > tr:nth-of-type(3) > td:nth-of-type(2)'
      }
    ],
    analyses: [
      {
        name: 'shortTendency',
        type: 'html',
        path: '.vwdWidget > div:nth-of-type(2) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)'
      },
      {
        name: 'mediumTendency',
        type: 'html',
        path: '.vwdWidget > div:nth-of-type(2) > table > tbody > tr:nth-of-type(2) > td:nth-of-type(2)'
      }
    ],
    news: {}
  },
  {
    id: 11,
    code: 'teleb',
    name: 'Teleborsa',
    url: 'https://www.teleborsa.it/azioni/%teleb_code%/analisi?tab=2',
    info: [],
    analyses: [
      {
        name: 'support',
        type: 'html',
        path: '#ctl00_phContents_ctlAdditionalInfo_lblSupporto2'
      },
      {
        name: 'resistance',
        type: 'html',
        path: '#ctl00_phContents_ctlAdditionalInfo_lblResistenza2'
      },
      {
        name: 'trend',
        type: 'html',
        path: '#ctl00_phContents_ctlAnalysis_pnlAnalisiDiStatus > p'
      }
    ]
  }
]