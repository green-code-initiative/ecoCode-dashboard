import fetchSonar from '../index'

const API = 'issues';
const ECOCODE_ISSUE_TAG = 'ecocode';
const statuses = 'OPEN,CONFIRMED,REOPENED,RESOLVED';

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
    const [languages] = language.split('-');
    const tags = ECOCODE_ISSUE_TAG;
    const queryParams =  new URLSearchParams({
        componentKeys, languages, branch, statuses, tags
    });
    const response = await fetchSonar(routeUrl, queryParams);
    // get page
    const page = response.pop() ?? {};
    const { issues = [] } = page;
    return issues;
}
