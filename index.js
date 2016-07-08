const http = require('http')

const server = http.createServer()

server.on('request', function (req, res) {
  res.end('ok')
})

server.listen(3000)
