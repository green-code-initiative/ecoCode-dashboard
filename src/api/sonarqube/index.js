// TODO: identify the correct way to retrieve the Sonar authentication token
const SONAR_TOKEN = import.meta.env.VITE_SONAR_TOKEN

/**
 * @param {string} api
 * @param {URLSearchParams} params
 * @param {number} page
 * @param {number} pageSize
 * @returns
 */
export default async function fetchSonar(api, { params, headers, body, page = 1, pageSize = 500 }) {
  let result = []
  let totalPages = 0
  let totalElements = 0
  const paginatedParams = {
    p: page,
    ps: pageSize,
    ...params
  }
  if (SONAR_TOKEN) {
    headers['Authorization'] = `Bearer ${SONAR_TOKEN}`
  }
  const options = { headers, body }

  // this loop simplify the code but slows the issue loading
  // this API could return an iterable instead
  do {
    const url = new URL(api, '/api/')
    const response = await fetch(`${url}?${new URLSearchParams(paginatedParams)}`, options)
    if (response.paging) {
      totalElements = response.paging.total
    } else if (response.total) {
      totalElements = response.total
    }

    totalPages = Math.ceil(totalElements / pageSize)
    result = result.concat(response)
    page += 1
  } while (page <= totalPages)

  return result
}
