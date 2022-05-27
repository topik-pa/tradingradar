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
        path: '.-black-warm-60 > strong',
        numeric: true
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
        path: '.m-table > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > span > strong',
        numeric: true
      }
    ],
    analyses: [
      {
        name: 'support',
        type: 'html',
        path: 'span.-dato_techanalSup strong',
        numeric: true
      },
      {
        name: 'resistance',
        type: 'html',
        path: 'span.-dato_techanalRes strong',
        numeric: true
      },
      {
        name: 'rsi',
        type: 'html',
        path: '.m-table > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > span > strong',
        numeric: true
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
        clean: ['/media/img/technicalanalysis/rank-fta', '.gif'],
        numeric: true
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
    info: [],
    analyses: [],
    news: {}
  },
  {
    id: 4,
    code: 'milFin',
    name: 'Milano Finanza',
    url: 'https://www.milanofinanza.it/quotazioni/dettaglio/%lowerCaseCode%-%mf_code%',
    info: [
      {
        name: 'divYield',
        type: 'html',
        path: '.d-flex > div:nth-of-type(3) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(2)'
      },
      {
        name: 'lastDiv',
        type: 'html',
        path: '.d-flex > div:nth-of-type(3) > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2)'
      },
      {
        name: 'lastDivDate',
        type: 'html',
        path: '.d-flex > div:nth-of-type(3) > table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)'
      }
    ],
    analyses: [
      {
        name: 'mfRanking',
        type: 'html',
        path: '.risk-mf > div > div:nth-of-type(3) > strong'
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
      },
      {
        name: 'volume',
        type: 'html',
        path: '.scheda-titolo > div:nth-of-type(4) > ul > li > div > div > div:nth-of-type(6)',
        clean: ['Azioni scambiate:']
      }
    ],
    analyses: [
      {
        name: 'lastTargetPrice',
        type: 'html',
        path: '.tabellaDati > tbody > tr:nth-of-type(1) > td:nth-of-type(4) > span'
      },
      {
        name: 'lastJudgment',
        type: 'html',
        path: '.tabellaDati > tbody > tr:nth-of-type(1) > td:nth-of-type(3) > span'
      }
    ],
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
        path: '.left .boxDettaglioColumn > tbody > tr:nth-of-type(1) > td:nth-of-type(2)',
        numeric: true
      },
      {
        name: 'mm40days',
        type: 'html',
        path: '.left .boxDettaglioColumn > tbody > tr:nth-of-type(2) > td:nth-of-type(2)',
        numeric: true
      },
      {
        name: 'mm100days',
        type: 'html',
        path: '.left .boxDettaglioColumn > tbody > tr:nth-of-type(3) > td:nth-of-type(2)',
        numeric: true
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
        name: 'tbSupport',
        type: 'html',
        path: '#ctl00_phContents_ctlAdditionalInfo_lblSupporto2',
        numeric: true
      },
      {
        name: 'tbResistance',
        type: 'html',
        path: '#ctl00_phContents_ctlAdditionalInfo_lblResistenza2',
        numeric: true
      },
      {
        name: 'trend',
        type: 'html',
        path: '#ctl00_phContents_ctlAnalysis_pnlAnalisiDiStatus > p'
      }
    ]
  }
]