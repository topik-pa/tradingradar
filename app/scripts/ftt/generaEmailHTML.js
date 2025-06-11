function formatData(stock) {
  const ND = 'ND'
  return {
    name: stock.name || ND,
    isin: stock.isin || ND,
    segment: stock.segment.value || ND,
    today: new Date().toLocaleDateString('it-IT', {day: 'numeric', month: 'long', year: 'numeric'}),
    price: stock.lastPrice.value || ND,
    isPerf1MShocking: (Math.abs( parseInt(stock.perf1M.value.replace('%', '')) ) > 10) ? 'style="display:block"' : 'style="display:none"',
    perf1M: stock.perf1M.value || ND,
    divYield: stock.divYield.value || ND,
    lastDiv: stock.lastDiv.value || ND,
    lastDivDate: stock.lastDivDate.value || ND,
    lastJudgmentDate: stock.lastJudgment.value[0] || ND,
    lastJudgmentBank: stock.lastJudgment.value[1] || ND,
    lastJudgmentValue: stock.lastJudgment.value[2] || ND,
    lastJudgmentTP: stock.lastJudgment.value[3] || ND,
    sol24_shortTendency: stock.sol24_shortTendency.value || ND,
    sol24_mediumTendency: stock.sol24_mediumTendency.value || ND,
    milFin_mfRanking: stock.milFin_mfRanking.value || ND,
    milFin_mfRisk: stock.milFin_mfRisk.value || ND,
    milFin_source: stock.milFin_mfRisk.source || '#',
    teleb_resistance: stock.teleb_resistance.value || ND,
    teleb_support: stock.teleb_support.value || ND,
    teleb_source: stock.teleb_support.source || '#',
    ctaUrl: `https://www.tradingradar.net/analisi/${encodeURI(stock.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/'/g, '-'))}?isin=${stock.isin}&ftt`
  }
}


function generaEmailHTML(stock) {
  const data = formatData(stock)
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title></title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif; color:#333;">
            
            <!-- Header -->
            <tr>
              <td style="background:#fff; color:#222; padding:20px; font-size:26px; text-align:left;border-bottom:1px solid #222; font-weight:bold;">
                ${data.name}
                <div style="color: #888;font-size:16px;font-weight:normal;">
                  <br>
                  Codice ISIN: ${data.isin}<br>
                  Mercato: ${data.segment}<br>
                  Data rapporto: ${data.today}<br>
                </div>
              </td>
            </tr>
  
            <!-- Prezzo -->
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:20px; font-weight:bold;">
                Ultimo prezzo rilevato
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                € ${data.price}
              </td>
            </tr>
  
  
            <!-- Prezzo -->
            <tr ${data.isPerf1MShocking}>
              <td style="padding:30px 20px 10px 20px; font-size:20px; font-weight:bold;">
                Performance ultimo mese
              </td>
            </tr>
            <tr ${data.isPerf1MShocking}>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                ${data.perf1M}
              </td>
            </tr>
            <tr ${data.isPerf1MShocking}>
              <td style="padding:0px 20px 10px 20px; font-size:16px; color: #c0242e; font-style: italic;">
                Attenzione: il titolo sta generando ampi movimenti di prezzo!
              </td>
            </tr>
  
            <!-- Dividendo -->
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:20px; font-weight:bold;">
                Dividendo
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Div. Yield: ${data.divYield}%
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Valore dividendo: ${data.lastDiv}€
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Data dividendo: ${data.lastDivDate}
              </td>
            </tr>
  
  
            <!-- Ultimo giudizio -->
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:20px; font-weight:bold;">
                Ultimo giudizio dalle Banche di Affari
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Data: ${data.lastJudgmentDate}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Istituto: ${data.lastJudgmentBank}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Giudizio: ${data.lastJudgmentValue}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Target price: ${data.lastJudgmentTP}€
              </td>
            </tr>
  
            <!-- Analisi -->
            <tr>
              <td style="padding:60px 20px 10px 20px; font-size:20px; font-weight:bold;">
                Analisi dalle principali testate online
              </td>
            </tr>
  
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:18px; font-weight:bold;">
                Il Sole 24 Ore
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Tendenza breve periodo: ${data.sol24_shortTendency}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Tendenza medio periodo: ${data.sol24_mediumTendency}
              </td>
            </tr>
            
  
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:18px; font-weight:bold;">
                Milano Finanza
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Rating [A-E]: ${data.milFin_mfRanking}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Risk [0-100]: ${data.milFin_mfRisk}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:16px;font-style: italic;">
                <a href="${data.milFin_source}">Analisi completa ${data.name} su Milano Finanza</a>
              </td>
            </tr>
  
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:18px; font-weight:bold;">
                Teleborsa
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Resistenza: ${data.teleb_resistance}€
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Supporto: ${data.teleb_support}€
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:16px;font-style: italic;">
                <a href="${data.teleb_source}">Analisi completa ${data.name} su Teleborsa</a>
              </td>
            </tr>
  
  
  
            <!-- CTA -->
            <tr>
              <td align="center" style="padding:60px 20px 10px 20px; font-size:20px">
                <a href="${data.ctaUrl}" style="background:#d82e2b; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
                  Leggi l'articolo completo
                </a>
              </td>
            </tr>


            <!-- DISCLAIMER -->
            <tr style="color: #888;font-size:14px;font-weight:normal;font-style:italic">
              <td align="center" style="padding:60px 20px 10px 20px">
              Attenzione: operare in Borsa e fare trading costituiscono azioni ad alto rischio. Le informazioni qui presentate non costituiscono una sollecitazione di acquisto o vendita di titoli azionari e si intendono per puro uso informativo. Il Portale Web tradingradar.net non si dichiara responsabile di un utilizzo improprio delle informazioni qui ottenute.
              </td>
            </tr>
  
  
            <!-- Footer -->
            <tr>
              <td style="padding:20px; font-size:12px; text-align:center; color:#888;">
                Ricevi questa email perché ti sei iscritto su <strong>tradingradar.net</strong>. <br>Se non desideri più ricevere comunicazioni, puoi farcelo sapere inviando la tua richiesta a info@tradingradar.net.
              </td>
            </tr>
  
          </table>
        </td>
      </tr>
    </table>
    </body>
  </html>
  
`
}

module.exports = { generaEmailHTML }
