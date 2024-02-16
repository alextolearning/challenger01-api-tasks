import http from 'node:http'

import json from './middlewares/json.js'
import extractQueryParameters from './utils/extractQueryParameters.js'
import routes from './routes/index.js'

const port = process.env.PORT || 3334

const server = http.createServer(async function(req, res) {
  await json(req, res)

  const { url, method } = req

  const route = routes.find(route => route.url.test(url) && route.method === method)

  if (route) {
    const routeParameters = req.url.match(route.url)

    const { query, ...params} = routeParameters.groups

    req.params = params
    req.query = query ? extractQueryParameters(query) : {}

    return route.handle(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(port, function() {
  console.log('listening on port ' + port)
})
