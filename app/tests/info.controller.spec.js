/* eslint-disable no-undef */

const chai = require('chai')
const expect = chai.expect
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../../index')

chai.use(chaiHttp)


describe('tradingradar.net - testing info routes...', function () {

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


  describe('GET "/api/info/:isin" route', () => {

    it('it should reply with a JSON and all the informations about the given stock', (done) => {
      chai.request(server)
        .get('/api/info/IT0005278236')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('isin').include('IT0005278236')
          res.body.should.have.property('name').include('Pirelli & C')
          res.body.should.have.property('code').include('PIRC')
          
          res.body.should.have.property('perf1M')
          res.body.should.have.nested.property('perf1M.value')
          res.body.should.have.nested.property('perf1M.source')

          res.body.should.have.property('perf6M')
          res.body.should.have.nested.property('perf6M.value')
          res.body.should.have.nested.property('perf6M.source')

          res.body.should.have.property('perf1Y')
          res.body.should.have.nested.property('perf1Y.value')
          res.body.should.have.nested.property('perf1Y.source')

          res.body.should.have.property('volatility')
          res.body.should.have.nested.property('volatility.value')
          res.body.should.have.nested.property('volatility.source')

          res.body.should.have.property('comment')
          res.body.should.have.nested.property('comment.value')
          res.body.should.have.nested.property('comment.source')

          res.body.should.have.property('divYield')
          res.body.should.have.nested.property('divYield.value')
          res.body.should.have.nested.property('divYield.source')

          res.body.should.have.property('lastDiv')
          res.body.should.have.nested.property('lastDiv.value')
          res.body.should.have.nested.property('lastDiv.source')

          res.body.should.have.property('lastDivDate')
          res.body.should.have.nested.property('lastDivDate.value')
          res.body.should.have.nested.property('lastDivDate.source')

          res.body.should.have.property('mm20days')
          res.body.should.have.nested.property('mm20days.value')
          res.body.should.have.nested.property('mm20days.source')

          res.body.should.have.property('mm40days')
          res.body.should.have.nested.property('mm40days.value')
          res.body.should.have.nested.property('mm40days.source')

          res.body.should.have.property('mm100days')
          res.body.should.have.nested.property('mm100days.value')
          res.body.should.have.nested.property('mm100days.source')

          res.body.should.have.property('profile')
          res.body.should.have.nested.property('profile.value')
          res.body.should.have.nested.property('profile.source')

          res.body.should.have.property('absMin')
          res.body.should.have.nested.property('absMin.value')
          res.body.should.have.nested.property('absMin.source')

          res.body.should.have.property('absMax')
          res.body.should.have.nested.property('absMax.value')
          res.body.should.have.nested.property('absMax.source')

          res.body.should.have.property('currentYearMin')
          res.body.should.have.nested.property('currentYearMin.value')
          res.body.should.have.nested.property('currentYearMin.source')

          res.body.should.have.property('currentYearMax')
          res.body.should.have.nested.property('currentYearMax.value')
          res.body.should.have.nested.property('currentYearMax.source')

          res.body.should.have.property('webSite')
          res.body.should.have.nested.property('webSite.value')
          res.body.should.have.nested.property('webSite.source')

          res.body.should.have.property('address')
          res.body.should.have.nested.property('address.value')
          res.body.should.have.nested.property('address.source')

          done()
        })
    })

  })


})
