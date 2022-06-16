/* eslint-disable no-undef */

const chai = require('chai')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../../index')

chai.use(chaiHttp)


describe('tradingradar.net - testing analysis routes...', function () {

  //Before all tests
  before(function(done) {
    done()
  })

  beforeEach(function(done) {
    // I do stuff like populating db
    this.timeout(5000)
    done()
  })

  afterEach(function(done) {
    // I do stuff like deleting populated db
    done()
  })

  //Before all tests
  after(function(done) {
    done()
  })


  describe('GET "/api/analysis/:isin" route', () => {

    it('it should reply with a JSON and all the analyses about the given stock', (done) => {
      chai.request(server)
        .get('/api/analysis/NL0000226223')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          
          res.body.should.have.property('isin').include('NL0000226223')
          res.body.should.have.property('name').include('Stmicroelectronics')
          res.body.should.have.property('code').include('STM')

          res.body.should.have.property('sol24_shortTendency')
          res.body.should.have.nested.property('sol24_shortTendency.value')
          res.body.should.have.nested.property('sol24_shortTendency.source')

          res.body.should.have.property('sol24_mediumTendency')
          res.body.should.have.nested.property('sol24_mediumTendency.value')
          res.body.should.have.nested.property('sol24_mediumTendency.source')

          res.body.should.have.property('milFin_mfRanking')
          res.body.should.have.nested.property('milFin_mfRanking.value')
          res.body.should.have.nested.property('milFin_mfRanking.source')

          res.body.should.have.property('milFin_mfRsi')
          res.body.should.have.nested.property('milFin_mfRsi.value')
          res.body.should.have.nested.property('milFin_mfRsi.source')

          res.body.should.have.property('borsaIt_rsi')
          res.body.should.have.nested.property('borsaIt_rsi.value')
          res.body.should.have.nested.property('borsaIt_rsi.source')

          res.body.should.have.property('borsaIt_support')
          res.body.should.have.nested.property('borsaIt_support.value')
          res.body.should.have.nested.property('borsaIt_support.source')

          res.body.should.have.property('borsaIt_resistance')
          res.body.should.have.nested.property('borsaIt_resistance.value')
          res.body.should.have.nested.property('borsaIt_resistance.source')

          res.body.should.have.property('borsaIt_rsi')
          res.body.should.have.nested.property('borsaIt_rsi.value')
          res.body.should.have.nested.property('borsaIt_rsi.source')

          res.body.should.have.property('borsaIt_evaluation')
          res.body.should.have.nested.property('borsaIt_evaluation.value')
          res.body.should.have.nested.property('borsaIt_evaluation.source')

          res.body.should.have.property('borsaIt_rating')
          res.body.should.have.nested.property('borsaIt_rating.value')
          res.body.should.have.nested.property('borsaIt_rating.source')

          res.body.should.have.property('teleb_tbSupport')
          res.body.should.have.nested.property('teleb_tbSupport.value')
          res.body.should.have.nested.property('teleb_tbSupport.source')

          res.body.should.have.property('teleb_tbResistance')
          res.body.should.have.nested.property('teleb_tbResistance.value')
          res.body.should.have.nested.property('teleb_tbResistance.source')

          res.body.should.have.property('teleb_trend')
          res.body.should.have.nested.property('teleb_trend.value')
          res.body.should.have.nested.property('teleb_trend.source')

          res.body.should.have.property('lastTargetPrice')
          res.body.should.have.nested.property('lastTargetPrice.value')
          res.body.should.have.nested.property('lastTargetPrice.source')

          res.body.should.have.property('lastJudgment')
          res.body.should.have.nested.property('lastJudgment.value')
          res.body.should.have.nested.property('lastJudgment.source')

          done()
        })
    })



    it('it should reply with a JSON and all the analyses about the given stock and given source (Borsa Italiana)', (done) => {
      chai.request(server)
        .get('/api/analysis/NL0000226223/borsaIt')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')

          res.body.should.have.property('isin').include('NL0000226223')
          res.body.should.have.property('name').include('Stmicroelectronics')
          res.body.should.have.property('code').include('STM')

          res.body.should.have.property('support')
          res.body.should.have.nested.property('support.value')
          res.body.should.have.nested.property('support.source')

          res.body.should.have.property('resistance')
          res.body.should.have.nested.property('resistance.value')
          res.body.should.have.nested.property('resistance.source')

          res.body.should.have.property('rsi')
          res.body.should.have.nested.property('rsi.value')
          res.body.should.have.nested.property('rsi.source')

          res.body.should.have.property('evaluation')
          res.body.should.have.nested.property('evaluation.value')
          res.body.should.have.nested.property('evaluation.source')

          res.body.should.have.property('rating')
          res.body.should.have.nested.property('rating.value')
          res.body.should.have.nested.property('rating.source')

          done()
        })
    })



    it('it should reply with a JSON and all the analyses about the given stock and given source (Teleborsa)', (done) => {
      chai.request(server)
        .get('/api/analysis/IT0005278236/teleb')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')

          res.body.should.have.property('isin').include('IT0005278236')
          res.body.should.have.property('name').include('Pirelli & C')
          res.body.should.have.property('code').include('PIRC')

          res.body.should.have.property('tbSupport')
          res.body.should.have.nested.property('tbSupport.value')
          res.body.should.have.nested.property('tbSupport.source')

          res.body.should.have.property('tbResistance')
          res.body.should.have.nested.property('tbResistance.value')
          res.body.should.have.nested.property('tbResistance.source')

          res.body.should.have.property('trend')
          res.body.should.have.nested.property('trend.value')
          res.body.should.have.nested.property('trend.source')

          done()
        })
    })

  })


})
