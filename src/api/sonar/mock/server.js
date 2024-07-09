// raw mock server
// should be removed to leave place to MSW

import http from 'node:http'

const server = http.createServer(async (request, response) => {
    const [,path] = request.url.split('/api/')
    try {
        const [api, route] = path.split('/')
        console.info(api, route)
        const body = await import(`../issues/sonar.${api}.${route}.mock.js`)
        response.setHeader('Content-Type', 'application/json')
        response.write(JSON.stringify(body))
    } catch (error) {
        response.statusCode = 404 // Not Found
    }
    response.end()
})

server.listen(4242)