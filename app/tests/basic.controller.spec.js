/* eslint-disable no-undef */

const chai = require('chai')
const expect = chai.expect
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../../index')

chai.use(chaiHttp)


describe('tradingradar.net - testing basic server functionality...', function () {

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


  describe('GET "/" route', () => {

    it('it should reply with a JSON Welcome message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message').include('Welcome to tradingradar.net API service')
          done()
        })
    })

  })


  describe('GET "/api" route', () => {

    it('it should reply with a JSON list of available routes', (done) => {
      chai.request(server)
        .get('/api')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('title').include('Available routes')
          res.body.should.have.property('routes').that.satisfy(function (value) {
            expect(value).to.be.instanceof(Array)
            expect(value).to.have.length.above(0)
            return true
          })
          done()
        })
    })

  })


  describe('GET "/api/stocks" route', () => {

    it('it should reply with a JSON list of all included stocks', (done) => {
      chai.request(server)
        .get('/api/stocks')
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


  describe('GET 404 route', () => {

    it('it should reply with a 404 status and a JSON error message', (done) => {
      chai.request(server)
        .get('/api/not-available-route')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.should.have.property('message').include('Resource not found')
          done()
        })
    })

  })

})
