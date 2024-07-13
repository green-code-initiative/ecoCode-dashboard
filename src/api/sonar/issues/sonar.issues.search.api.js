//import sonarRequestAPI from '@sonar/sonar-request'
import sonarRequestAPI from '../polyfills/sonar-request'

const API = 'api/issues'
const ECOCODE_ISSUE_TAG = 'ecocode'
const statuses = 'OPEN,CONFIRMED,REOPENED,RESOLVED'

/**
 * Return issues detected by Sonarqube
 * !! only gather issues that are NOT closed !!
 *
 * @param {string} componentKeys  key of the project
 * @param {string} language programming language
 * @param {string} branch
 * @returns
 */
export async function findIssues(componentKeys, language, branch) {
  const routeUrl = `${API}/search`
  const [languages] = language.split('-')
  const tags = ECOCODE_ISSUE_TAG
  const searchParams = {
    componentKeys,
    languages,
    branch,
    statuses,
    tags
  }
  const page = await sonarRequestAPI.getJSON(routeUrl, searchParams)
  const { issues = [] } = page
  return issues
}
