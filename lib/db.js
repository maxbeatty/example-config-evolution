const Joi = require('joi')
const pg = require('pg')

const optionsSchema = {
  host: Joi.string().required(),
  user: Joi.string().required(),
  database: Joi.string().required(),
  password: Joi.string().empty(''),
  port: Joi.number(),
  max: Joi.number(), // max number of clients in the pool
  idleTimeoutMillis: Joi.number() // how long a client is allowed to remain idle before being closed
}

exports.register = function (server, options, next) {
  Joi.validate(options, optionsSchema, (err, config) => {
    if (err) {
      return next(err)
    }

    const pool = new pg.Pool(config)

    server.expose('query', pool.query.bind(pool))

    next()
  })
}

exports.register.attributes = {
  name: 'db'
}
