function formatData(stock) {
  const ND = 'ND'
  return {
    name: stock.name || ND,
    isin: stock.isin || ND,
    segment: stock.segment?.value || ND,
    today: stock.updatedAt.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Rome',
      hour12: false
    }),
    price: stock.lastPrice?.value || ND,
    variation: stock.priceVariation?.value || ND,
    isPerf1MShocking: (Math.abs( parseInt(stock.perf1M?.value.replace('%', '')) ) > 10) ? 'style="display:block"' : 'style="display:none"',
    perf1M: stock.perf1M?.value || ND,
    divYield: stock.divYield?.value || ND,
    lastDiv: stock.lastDiv?.value || ND,
    lastDivDate: stock.lastDivDate?.value || ND,
    lastJudgmentDate: stock.lastJudgment?.value[0] || ND,
    lastJudgmentBank: stock.lastJudgment?.value[1] || ND,
    lastJudgmentValue: stock.lastJudgment?.value[2] || ND,
    lastJudgmentTP: stock.lastJudgment?.value[3] || ND,
    sol24_shortTendency: stock.sol24_shortTendency?.value || ND,
    sol24_mediumTendency: stock.sol24_mediumTendency?.value || ND,
    milFin_mfRanking: stock.milFin_mfRanking?.value || ND,
    milFin_mfRisk: stock.milFin_mfRisk?.value || ND,
    milFin_source: stock.milFin_mfRisk.source || '#',
    teleb_resistance: stock.teleb_resistance?.value || ND,
    teleb_support: stock.teleb_support?.value || ND,
    teleb_source: stock.teleb_support.source || '#',
    ctaUrl: `https://www.tradingradar.net/analisi/${encodeURI(stock.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/'/g, '-'))}?isin=${stock.isin}&ftt`
  }
}


function generaEmailHTML(stock) {
  const data = formatData(stock)
  return `
  <!DOCTYPE html><html><head><meta charset="UTF-8"><title>tradingradar.net - Follow The Title</title></head><body style="margin:0;padding:0;font-family:Verdana,sans-serif;background:#fff"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table width="700" cellpadding="0" cellspacing="0" border="0" style="max-width:700px"><tr><td bgcolor="#000" style="padding:10px;text-align:center;color:#fff"><h1 style="margin:0;font-size:32px;letter-spacing:2px;font-family:monospace">tradingradar.net</h1><p style="margin:10px 0 0;font-size:14px;text-transform:uppercase;letter-spacing:1px">Segui il titolo: ${data.name}</p></td></tr><tr><td style="border:1px solid #000;text-align:center;padding:30px 20px"><h2 style="margin:0;font-size:32px">${data.name}</h2><p style="margin:10px 0 0;font-size:14px;letter-spacing:1px;color:#777">Codice ISIN: ${data.isin}<br>Mercato: ${data.segment}</p></td></tr><tr><td style="text-align:center;color:#777;padding:20px">Data generazione dati: ${data.today}</td></tr><tr><td style="padding:20px"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="33.33%" align="center" valign="top"><div style="width:200px;height:200px;border:1px solid #777;line-height:200px;color:#777;font-weight:700;font-size:220%">${data.price}€</div><p style="font-weight:700">Ultimo prezzo</p></td><td width="33.33%" align="center" valign="top"><div style="width:200px;height:200px;border:1px solid #777;line-height:200px;color:#777;font-weight:700;font-size:220%">${data.variation}</div><p style="font-weight:700">Variazione</p></td><td width="33.33%" align="center" valign="top"><div style="width:200px;height:200px;border:1px solid #777;line-height:200px;color:#777;font-weight:700;font-size:220%">${data.perf1M}</div><p style="font-weight:700">Performance mensile</p></td></tr></table></td></tr><tr><td style="padding:20px;border-bottom:1px solid #777"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:30px 20px;font-weight:700">Ultimo<br>dividendo</td><td style="text-align:center;padding:30px 20px"><p style="letter-spacing:1px;color:#777">Div. Yield: ${data.divYield}%<br>Valore dividendo: ${data.lastDiv}€<br>Data dividendo: ${data.lastDivDate}</p></td></tr></table></td></tr><tr><td style="padding:20px;border-bottom:1px solid #777"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:30px 20px;font-weight:700">Ultima<br>raccomandazione</td><td style="text-align:center;padding:30px 20px"><p style="letter-spacing:1px;color:#777">In data: ${data.lastJudgmentDate}<br>Istituto: ${data.lastJudgmentBank}<br>Giudizio: ${data.lastJudgmentValue}<br>Target price: ${data.lastJudgmentTP}€</p></td></tr></table></td></tr><tr><td style="padding:20px;border-bottom:1px solid #777"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:30px 20px;font-weight:700">Analisi<br>Il Sole 24 Ore</td><td style="text-align:center;padding:30px 20px"><p style="letter-spacing:1px;color:#777">Tendenza breve periodo: ${data.sol24_shortTendency}<br>Tendenza medio periodo: ${data.sol24_mediumTendency}</p></td></tr></table></td></tr><tr><td style="padding:20px;border-bottom:1px solid #777"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:30px 20px;font-weight:700">Analisi<br>Milano Finanza</td><td style="text-align:center;padding:30px 20px"><p style="letter-spacing:1px;color:#777">Rating [A-E]: ${data.milFin_mfRanking}<br>Risk [0-100]: ${data.milFin_mfRisk}<br><br><a href="${data.milFin_source}">Analisi completa ${data.name} su Milano Finanza</a></p></td></tr></table></td></tr><tr><td style="padding:20px;border-bottom:1px solid #777"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:30px 20px;font-weight:700">Analisi<br>Teleborsa</td><td style="text-align:center;padding:30px 20px"><p style="letter-spacing:1px;color:#777">Resistenza: ${data.teleb_resistance}€<br>Supporto: ${data.teleb_support}€<br><br><a href="${data.teleb_source}">Analisi completa ${data.name} su Teleborsa</a></p></td></tr></table></td></tr><tr><td align="center" style="padding:60px 20px 10px;font-size:20px"><a href="${data.ctaUrl}" style="background:#d82e2b;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px">Leggi l'analisi completa su tradingradar.net</a></td></tr><tr><td style="padding:60px 20px 10px"></td></tr><tr><td align="center" style="padding:60px 20px 10px;color:#888;font-size:14px;font-weight:400;font-style:italic">Attenzione: operare in Borsa e fare trading costituiscono azioni ad alto rischio. Le informazioni qui presentate non costituiscono una sollecitazione di acquisto o vendita di titoli azionari e si intendono per puro uso informativo. Il Portale Web tradingradar.net non si dichiara responsabile di un utilizzo improprio delle informazioni qui ottenute.</td></tr><tr><td bgcolor="#000" style="text-align:center;color:#fff;font-size:14px;padding:20px">Ricevi questa email perché ti sei iscritto su<strong>tradingradar.net</strong>.<br>Se non desideri più ricevere comunicazioni, puoi farcelo sapere inviando la tua richiesta a: <strong>info@tradingradar.net</strong>.</td></tr></table></td></tr></table></body></html>
`
}

module.exports = { generaEmailHTML }
