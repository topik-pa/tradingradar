/* eslint-disable no-undef */

const chai = require('chai')
const expect = chai.expect
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../../index')

chai.use(chaiHttp)


describe('tradingradar.net - testing news routes...', function () {

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


  describe('GET "/api/news/:isin" route', () => {

    it('it should reply with a JSON and all the news about the given stock', (done) => {
      chai.request(server)
        .get('/api/news/NL0000226223')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length.above(0)
            return true
          })
          done()
        })
    })


    it('it should reply with a JSON and all the news about the given stock for the givn media (Borsa Italiana)', (done) => {
      chai.request(server)
        .get('/api/news/NL0000226223/borsaIt')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length.above(0)
            return true
          })
          done()
        })
    })

  })


})
