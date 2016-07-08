const Lab = require('lab')
const Code = require('code')

const lab = exports.lab = Lab.script()

const Hapi = require('hapi')

let StubDbQuery

const MockDb = function (server, options, next) {
  server.expose('query', () => StubDbQuery)
  next()
}

MockDb.attributes = {
  name: 'db'
}

lab.experiment('web', () => {
  let server

  lab.beforeEach((done) => {
    server = new Hapi.Server()

    server.connection()

    server.register([
      MockDb,
      require('../../lib/web')
    ])

    done()
  })

  lab.experiment('GET /', () => {
    const method = 'GET'
    const url = '/'
    const request = {
      method: method,
      url: url
    }

    lab.test('registers route', (done) => {
      Code.expect(server.match(method, url)).to.not.be.null()

      done()
    })

    lab.test('handler then', (done) => {
      StubDbQuery = Promise.resolve()

      server.inject(request, (res) => {
        Code.expect(res.statusCode).to.equal(200)

        done()
      })
    })

    lab.test('handler then', (done) => {
      StubDbQuery = Promise.reject(new Error())

      server.inject(request, (res) => {
        Code.expect(res.statusCode).to.equal(500)

        done()
      })
    })
  })
})
