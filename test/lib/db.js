const Lab = require('lab')
const Code = require('code')

const lab = exports.lab = Lab.script()

const Hapi = require('hapi')

lab.experiment('db', () => {
  let server

  lab.beforeEach((done) => {
    server = new Hapi.Server()

    server.connection()

    done()
  })

  lab.test('required options', (done) => {
    server.register({
      register: require('../../lib/db'),
      options: {
        // intentionally empty
      }
    }, (err) => {
      Code.expect(err).to.be.error()

      done()
    })
  })

  lab.experiment('plugin', () => {
    lab.beforeEach((done) => {
      server.register({
        register: require('../../lib/db'),
        options: {
          host: 'localhost',
          user: 'test',
          database: 'test',
          password: '',
          port: 5432,
          max: 1,
          idleTimeoutMillis: 10000
        }
      }, done)
    })

    lab.test('registers', (done) => {
      Code.expect(server.plugins).to.include('db')

      done()
    })

    lab.test('exposes query method', (done) => {
      Code.expect(server.plugins.db).to.include('query')
      Code.expect(server.plugins.db.query).to.be.a.function()

      done()
    })
  })
})
