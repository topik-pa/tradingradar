/* eslint-disable no-undef */

const chai = require('chai')
const expect = chai.expect
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
        .get('/api/analysis/IT0005278236')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('sources').that.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length.above(0)
            return true
          })
          res.body.should.have.property('isin').include('IT0005278236')
          res.body.should.have.property('name').include('Pirelli & C')
          res.body.should.have.property('code').include('PIRC')
          res.body.should.have.property('sol24_shortTendency')
          res.body.should.have.property('sol24_mediumTendency')
          res.body.should.have.property('milFin_mfRanking')
          res.body.should.have.property('milFin_mfRisk')
          res.body.should.have.property('milFin_rsi')
          res.body.should.have.property('borsaIt_support')
          res.body.should.have.property('borsaIt_resistance')
          res.body.should.have.property('borsaIt_rsi')
          res.body.should.have.property('borsaIt_evaluation')
          res.body.should.have.property('borsaIt_rating')
          res.body.should.have.property('teleb_support')
          res.body.should.have.property('teleb_resistance')
          res.body.should.have.property('teleb_trend')
          done()
        })
    })



    it('it should reply with a JSON and all the analyses about the given stock and given source (Borsa Italiana)', (done) => {
      chai.request(server)
        .get('/api/analysis/IT0005278236/borsaIt')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('sources').that.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length.above(0)
            return true
          })
          res.body.should.have.property('isin').include('IT0005278236')
          res.body.should.have.property('name').include('Pirelli & C')
          res.body.should.have.property('code').include('PIRC')
          res.body.should.have.property('support')
          res.body.should.have.property('resistance')
          res.body.should.have.property('rsi')
          res.body.should.have.property('evaluation')
          res.body.should.have.property('rating')
          done()
        })
    })



    it('it should reply with a JSON and all the analyses about the given stock and given source (Teleborsa)', (done) => {
      chai.request(server)
        .get('/api/analysis/IT0005278236/teleb')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('sources').that.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length.above(0)
            return true
          })
          res.body.should.have.property('isin').include('IT0005278236')
          res.body.should.have.property('name').include('Pirelli & C')
          res.body.should.have.property('code').include('PIRC')
          res.body.should.have.property('support')
          res.body.should.have.property('resistance')
          res.body.should.have.property('trend')
          done()
        })
    })

  })


})
