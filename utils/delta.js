'use strict'

const fs = require('fs')

const myArgs = process.argv.slice(2)
const queries = [
  {
    name: 'Golden Cross Price',
    file: 'price_over_mm20',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: true
  },
  {
    name: 'Golden Cross Short',
    file: 'mm20_over_mm40',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: true
  },
  {
    name: 'Golden Cross Long',
    file: 'mm40_over_mm100',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'Dead Cross Price',
    file: 'price_below_mm20',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'Dead Cross Short',
    file: 'mm20_below_mm40',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'Dead Cross Long',
    file: 'mm40_below_mm100',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'Price over Resistance',
    file: 'price_over_BIresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm20 over Resistance',
    file: 'mm20_over_BIresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm40 over Resistance',
    file: 'mm40_over_BIresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm100 over Resistance',
    file: 'mm100_over_BIresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'Price below Support',
    file: 'price_below_BIsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm20 below Support',
    file: 'mm20_below_BIsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm40 below Support',
    file: 'mm40_below_BIsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm100 below Support',
    file: 'mm100_below_BIsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'price over Teleborsa Resistance',
    file: 'price_over_TBresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm20 over Teleborsa Resistance',
    file: 'mm20_over_TBresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm40 over Teleborsa Resistance',
    file: 'mm40_over_TBresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm100 over Teleborsa Resistance',
    file: 'mm100_over_TBresistance',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'price below Teleborsa Support',
    file: 'price_below_TBsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm20 below Teleborsa Support',
    file: 'mm20_below_TBsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm40 below Teleborsa Support',
    file: 'mm40_below_TBsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  },
  {
    name: 'mm100 below Teleborsa Support',
    file: 'mm100_below_TBsupport',
    list: [],
    added: [],
    removed: [],
    status: 0,
    active: false
  }
]

if(myArgs[0] === undefined || myArgs[1] === undefined ) {
  console.log('Errore nei parametri forniti')
  process.exit(1)
}

const prevDate = myArgs[0]
const nextDate = myArgs[1]


for(let x = 0; x < queries.length; x++) { 
  let current_query = queries[x]
  if(!current_query.active) continue

  fs.readFile('./query/' + prevDate + '/' + prevDate + '_' + current_query.file + '.json', (err, data) => {
    if (err) throw err
    let prev = JSON.parse(data)

    fs.readFile('./query/' + nextDate + '/' + nextDate + '_' + current_query.file + '.json', (err, data) => {
      if (err) throw err
      let next = JSON.parse(data)

      //Cerco elementi nuovi
      for(let y = 0; y < next.length; y++) {
        let current_next_elem = next[y]
        let match = false
        current_query.list.push(current_next_elem.name)
        for(let z = 0; z < prev.length; z++) {
          let current_prev_elem = prev[z]
          if(current_next_elem.isin === current_prev_elem.isin) {
            match = true
            break
          }
        }
        if(match === false) {
          current_query.added.push(current_next_elem.name)
        }
        current_query.status = 1
      }

      //Cerco elementi eliminati
      for(let y = 0; y < prev.length; y++) {
        let current_prev_elem = prev[y]
        let match = false
        for(let z = 0; z < next.length; z++) {
          let current_next_elem = next[z]
          if(current_next_elem.isin === current_prev_elem.isin) {
            match = true
            break
          }
        }
        if(match === false) {
          current_query.removed.push(current_prev_elem.name)
        }
        current_query.status = 2
      }


      if(current_query.status === 2) {
        console.log(current_query)
      }
      

    })
  })

}







/*if(myArgs[0] !== undefined) {
  fs.readFile('./' + myArgs[0] + '/' + myArgs[0] + '_dead_cross_long.json', (err, data) => {
    if (err) throw err
    prev = JSON.parse(data)


    if(myArgs[1] !== undefined) {
      fs.readFile('./' + myArgs[1] + '/' + myArgs[1] + '_dead_cross_long.json', (err, data) => {
        if (err) throw err
        next = JSON.parse(data)


        //Cerco elementi nuovi
        for(let x = 0; x < next.length; x++) {
          let current_next_elem = next[x].isin
          let match = false
          for(let y = 0; y < prev.length; y++) {
            let current_prev_elem = prev[y].isin
            if(current_next_elem === current_prev_elem) {
              match = true
              break
            }
          }
          if(match === false) {
            current_next_elem 
          }
        }

      })
    }

  })
}*/






