const fs = require('fs');
let date = new Date()
let now = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getDate()
//let now = 202215
let dir = './query/' + now + '/';

console.log('Esecuzione script...')

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
} else {
  console.log('Lo script è già stato avviato oggi.')
  process.exit(1)
}

db = connect('mongodb+srv://tr_admin_prod:7Rime0IbgNwqGSvL@tradingradar.ov6kh.mongodb.net/production?authSource=admin&replicaSet=atlas-h6nlsc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');
//db = connect('mongodb://tr_admin_dev:devdb@localhost:27017/tradingradar_dev?authSource=tradingradar_dev&readPreference=primary&appname=MongoDB%20Compass&ssl=false');

console.log('Numero di documenti trovati:')
printjson( db.ftsemibstocks.countDocuments() );


console.log('Estrazione di tutti i dati dal DB remoto')
const ftsemibstocks = db.ftsemibstocks.find();
fs.writeFileSync(dir + now + '_ftsemibstocks' + '.json', JSON.stringify(ftsemibstocks.toArray()));

const price_over_mm20 = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm20days.value', '$lastPrice.value']}} );
fs.writeFileSync(dir + now + '_price_over_mm20' + '.json', JSON.stringify(price_over_mm20.toArray()));
console.log('Query price over mm20: ' + price_over_mm20.count() + ' documenti estratti');

const mm20_over_mm40 = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm40days.value', '$mm20days.value']}} );
fs.writeFileSync(dir + now + '_mm20_over_mm40' + '.json', JSON.stringify(mm20_over_mm40.toArray()));
console.log('Query mm20 over mm40: ' + mm20_over_mm40.count() + ' documenti estratti');

const mm40_over_mm100 = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm100days.value', '$mm40days.value']}} );
fs.writeFileSync(dir + now + '_mm40_over_mm100' + '.json', JSON.stringify(mm40_over_mm100.toArray()));
console.log('Query mm40 over mm100: ' + mm40_over_mm100.count() + ' documenti estratti');



const price_below_mm20 = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm20days.value', '$lastPrice.value']}} );
fs.writeFileSync(dir + now + '_price_below_mm20' + '.json', JSON.stringify(price_below_mm20.toArray()));
console.log('Query price below mm20: ' + price_below_mm20.count() + ' documenti estratti');

const mm20_below_mm40 = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm40days.value', '$mm20days.value']}} );
fs.writeFileSync(dir + now + '_mm20_below_mm40' + '.json', JSON.stringify(mm20_below_mm40.toArray()));
console.log('Query mm20 below mm40: ' + mm20_below_mm40.count() + ' documenti estratti');

const mm40_below_mm100 = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm100days.value', '$mm40days.value']}} );
fs.writeFileSync(dir + now + '_mm40_below_mm100' + '.json', JSON.stringify(mm40_below_mm100.toArray()));
console.log('Query mm40 below mm100: ' + mm40_below_mm100.count() + ' documenti estratti');




const price_over_BIresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$lastPrice.value', '$borsaIt_resistance.value']}} );
fs.writeFileSync(dir + now + '_price_over_BIresistance' + '.json', JSON.stringify(price_over_BIresistance.toArray()));
console.log('Query price over Borsa Italiana resistance: ' + price_over_BIresistance.count() + ' documenti estratti');

const mm20_over_BIresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm20days.value', '$borsaIt_resistance.value']}} );
fs.writeFileSync(dir + now + '_mm20_over_BIresistance' + '.json', JSON.stringify(mm20_over_BIresistance.toArray()));
console.log('Query mm20 over Borsa Italiana resistance: ' + mm20_over_BIresistance.count() + ' documenti estratti');

const mm40_over_BIresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm40days.value', '$borsaIt_resistance.value']}} );
fs.writeFileSync(dir + now + '_mm40_over_BIresistance' + '.json', JSON.stringify(mm40_over_BIresistance.toArray()));
console.log('Query mm40 over Borsa Italiana resistance: ' + mm40_over_BIresistance.count() + ' documenti estratti');

const mm100_over_BIresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm100days.value', '$borsaIt_resistance.value']}} );
fs.writeFileSync(dir + now + '_mm100_over_BIresistance' + '.json', JSON.stringify(mm100_over_BIresistance.toArray()));
console.log('Query mm100 over Borsa Italiana resistance: ' + mm100_over_BIresistance.count() + ' documenti estratti');




const price_below_BIsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$lastPrice.value', '$borsaIt_support.value']}} );
fs.writeFileSync(dir + now + '_price_below_BIsupport' + '.json', JSON.stringify(price_below_BIsupport.toArray()));
console.log('Query price below Borsa Italiana support: ' + price_below_BIsupport.count() + ' documenti estratti');

const mm20_below_BIsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm20days.value', '$borsaIt_support.value']}} );
fs.writeFileSync(dir + now + '_mm20_below_BIsupport' + '.json', JSON.stringify(mm20_below_BIsupport.toArray()));
console.log('Query mm20 below Borsa Italiana support: ' + mm20_below_BIsupport.count() + ' documenti estratti');

const mm40_below_BIsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm40days.value', '$borsaIt_support.value']}} );
fs.writeFileSync(dir + now + '_mm40_below_BIsupport' + '.json', JSON.stringify(mm40_below_BIsupport.toArray()));
console.log('Query mm40 below Borsa Italiana support: ' + mm40_below_BIsupport.count() + ' documenti estratti');

const mm100_below_BIsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm100days.value', '$borsaIt_support.value']}} );
fs.writeFileSync(dir + now + '_mm100_below_BIsupport' + '.json', JSON.stringify(mm100_below_BIsupport.toArray()));
console.log('Query mm100 below Borsa Italiana support: ' + mm100_below_BIsupport.count() + ' documenti estratti');





const price_over_TBresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$lastPrice.value', '$teleb_resistance.value']}} );
fs.writeFileSync(dir + now + '_price_over_TBresistance' + '.json', JSON.stringify(price_over_TBresistance.toArray()));
console.log('Query price over Tele Borsa resistance: ' + price_over_TBresistance.count() + ' documenti estratti');

const mm20_over_TBresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm20days.value', '$teleb_resistance.value']}} );
fs.writeFileSync(dir + now + '_mm20_over_TBresistance' + '.json', JSON.stringify(mm20_over_TBresistance.toArray()));
console.log('Query mm20 over Tele Borsa resistance: ' + mm20_over_TBresistance.count() + ' documenti estratti');

const mm40_over_TBresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm40days.value', '$teleb_resistance.value']}} );
fs.writeFileSync(dir + now + '_mm40_over_TBresistance' + '.json', JSON.stringify(mm40_over_TBresistance.toArray()));
console.log('Query mm40 over Tele Borsa resistance: ' + mm40_over_TBresistance.count() + ' documenti estratti');

const mm100_over_TBresistance = db.ftsemibstocks.find( {$expr: {$gt: [ '$mm100days.value', '$teleb_resistance.value']}} );
fs.writeFileSync(dir + now + '_mm100_over_TBresistance' + '.json', JSON.stringify(mm100_over_TBresistance.toArray()));
console.log('Query mm100 over Tele Borsa resistance: ' + mm100_over_TBresistance.count() + ' documenti estratti');




const price_below_TBsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$lastPrice.value', '$teleb_support.value']}} );
fs.writeFileSync(dir + now + '_price_below_TBsupport' + '.json', JSON.stringify(price_below_TBsupport.toArray()));
console.log('Query price below Tele Borsa support: ' + price_below_TBsupport.count() + ' documenti estratti');

const mm20_below_TBsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm20days.value', '$teleb_support.value']}} );
fs.writeFileSync(dir + now + '_mm20_below_TBsupport' + '.json', JSON.stringify(mm20_below_TBsupport.toArray()));
console.log('Query mm20 below Tele Borsa support: ' + mm20_below_TBsupport.count() + ' documenti estratti');

const mm40_below_TBsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm40days.value', '$teleb_support.value']}} );
fs.writeFileSync(dir + now + '_mm40_below_TBsupport' + '.json', JSON.stringify(mm40_below_TBsupport.toArray()));
console.log('Query mm40 below Tele Borsa support: ' + mm40_below_TBsupport.count() + ' documenti estratti');

const mm100_below_TBsupport = db.ftsemibstocks.find( {$expr: {$lt: [ '$mm100days.value', '$teleb_support.value']}} );
fs.writeFileSync(dir + now + '_mm100_below_TBsupport' + '.json', JSON.stringify(mm100_below_TBsupport.toArray()));
console.log('Query mm100 below Tele Borsa support: ' + mm100_below_TBsupport.count() + ' documenti estratti');