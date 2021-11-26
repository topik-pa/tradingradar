/* eslint-disable no-undef */
const stocks = require('../configs/stocks.config')
const chai = require('chai')
const expect = chai.expect
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../../index')

chai.use(chaiHttp)


describe('tradingradar.net - testing stocks routes...', function () {

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


  describe('GET "/api/stocks/mfRisk" route', () => {
    it('it should reply with an array of all stocks and the mfRisk analysis', (done) => {
      chai.request(server)
        .get('/api/stocks/mfRisk')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length(stocks.length)
            return true
          })
          done()
        })
    })
    
  })


  describe('GET "/api/stocks/perf1M" route', () => {
    it('it should reply with an array of 3 stocks and the perf1M analysis', (done) => {
      chai.request(server)
        .get('/api/stocks/perf1M?size=3')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length(3)
            return true
          })
          done()
        })
    })
    
  })


})
