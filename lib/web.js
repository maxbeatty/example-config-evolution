exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      server.plugins.db.query('SELECT 1')
        .then(reply)
        .catch((err) => {
          reply(err.message).code(500)
        })
    }
  })

  next()
}

exports.register.attributes = {
  name: 'web',
  dependencies: 'db'
}
