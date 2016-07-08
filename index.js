const http = require('http')
const pg = require('pg')

const server = http.createServer()

// the client will read connection information from
// the same environment varaibles used by postgres cli tools
const client = new pg.Client()

server.on('request', (req, res) => {
  new Promise((resolve, reject) => {
    client.connect((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      client.query('SELECT 1;', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.stringify(result))
        }
      })
    })
  })
  .then((body) => {
    res.end(body)
  })
  .catch((err) => {
    // res.statusCode = 500
    res.end(err.message)
  })
})

server.listen(3000)
