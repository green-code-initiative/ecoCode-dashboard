import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'

import mockIssueList from './sonar.issues.search.mock'
import findIssues from './sonar.issues.search.api'

export const restHandlers = [
  http.get('/api/issues', () => HttpResponse.json(mockIssueList))
]

const server = setupServer(...restHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
//  Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

describe('findIssues', () => {
  test('findIssues retrieve 1 issue', async () => {
    const issues = await findIssues('foo', 'js', 'master')
    expect(issues).toBe(mockIssueList.issues)
  })
})
/*
describe.skip('Request Earth Polychromatic Imaging Camera', () => {
  let response
  let body

  beforeAll(async () => {
    response = await findIssues('foo', 'js', 'master')
    body = await response.json()
  })

  test('Should have response status 200', () => {
    expect(response.status).toBe(200)
  })

  test('Should have content-type', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Should have array in the body', () => {
    expectTypeOf(body).toBeArray()
  })

  test('The first item in array should contain EPIC in caption key', () => {
    expect(body[0].caption).to.have.string('EPIC')
  })
})
  */
