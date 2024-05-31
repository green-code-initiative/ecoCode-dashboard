import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(`/api/:api/:route`, async ({ params }) => {
    const { api, route } = params
    const { default: body } = await import(`../issues/sonar.${api}.${route}.mock.js`)
    return HttpResponse.json(body)
  })
]
