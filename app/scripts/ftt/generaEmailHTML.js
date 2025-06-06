function generaEmailHTML(stock) {
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
                ${stock.name}
                <div style="color: #888;font-size:16px;font-weight:normal;">
                  <br>
                  Codice ISIN: ${stock.isin}<br>
                  Mercato: ${stock.segment.value}<br>
                  Data rapporto: ${new Date().toLocaleDateString('it-IT', {day: 'numeric', month: 'long', year: 'numeric'})}<br>
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
                € ${stock.lastPrice.value}
              </td>
            </tr>
  
  
            <!-- Prezzo -->
            <tr ${(Math.abs( parseInt(stock.perf1M.value.replace('%', '')) ) > 10) ? 'style="display:block"' : 'style="display:none"'}>
              <td style="padding:30px 20px 10px 20px; font-size:20px; font-weight:bold;">
                Performance ultimo mese
              </td>
            </tr>
            <tr ${(Math.abs( parseInt(stock.perf1M.value.replace('%', '')) ) > 10) ?  'style="display:block"' : 'style="display:none"'}>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                € ${stock.perf1M.value}
              </td>
            </tr>
            <tr ${(Math.abs( parseInt(stock.perf1M.value.replace('%', '')) ) > 10) ?  'style="display:block"' : 'style="display:none"'}>
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
                Div. Yield: ${stock.divYield.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Valore dividendo: ${stock.lastDiv.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Data dividendo: ${stock.lastDivDate.value}
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
                Data: ${stock.lastJudgment.value[0]}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Istituto: ${stock.lastJudgment.value[1]}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Giudizio: ${stock.lastJudgment.value[2]}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:20px;">
                Target price: ${stock.lastJudgment.value[3]}
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
                Tendenza breve periodo: ${stock.sol24_shortTendency.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Tendenza medio periodo: ${stock.sol24_mediumTendency.value}
              </td>
            </tr>
            
  
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:18px; font-weight:bold;">
                Milano Finanza
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Rating [A-E]: ${stock.milFin_mfRanking.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Risk [0-100]: ${stock.milFin_mfRisk.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:16px;font-style: italic;">
                <a href="${stock.milFin_mfRisk.source}">Analisi completa ${stock.name} sul Milano Finanza</a>
              </td>
            </tr>
  
            <tr>
              <td style="padding:30px 20px 10px 20px; font-size:18px; font-weight:bold;">
                Teleborsa
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Resistenza: ${stock.teleb_resistance.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:18px;">
                Supporto: ${stock.teleb_support.value}
              </td>
            </tr>
            <tr>
              <td style="padding:0px 20px 10px 20px; font-size:16px;font-style: italic;">
                <a href="${stock.teleb_support.source}">Analisi completa ${stock.name} sul Teleborsa</a>
              </td>
            </tr>
  
  
  
            <!-- CTA -->
            <tr>
              <td align="center" style="padding:60px 20px 10px 20px; font-size:20px">
                <a href="https://www.tradingradar.net/analisi/${encodeURI(stock.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/'/g, '-'))}?isin=${stock.isin}&ftt" style="background:#d82e2b; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
                  Leggi l'articolo completo
                </a>
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
