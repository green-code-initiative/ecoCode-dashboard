import { post, ajaxSetup } from 'jquery';
import { issuesUrl } from '../common/apiUrls';
import { issuesStoreKey } from '../common/storageKeys';
import { getStoredData } from '../storage/DataStorage';
import getPaginatedList from './utils/Pageable';
import QueryParam from './utils/QueryParam';
import jsRules from '../../../resources/rules.json'
// const { jsRules } = require('../../../resources/rules.json');

async function findIssue(projectKey, issueKey, branchLike) {
  const queryParams = [];
  const projectParam = new QueryParam('componentKeys', projectKey);
  const issueParam = new QueryParam('issues', issueKey);
  const branchParam = new QueryParam('branch', branchLike);
  queryParams.push(projectParam);
  queryParams.push(issueParam);
  queryParams.push(branchParam);

  const response = await getPaginatedList(`${issuesUrl}/search`, queryParams);
  if (response) {
    return response;
  }
  return false;
}

async function setTagsIssue(issueKey, tags) {
  let tagsParam = tags[0];
  for (let index = 1; index < tags.length; index += 1) {
    tagsParam += ',';
    tagsParam += tags[index];
  }
  ajaxSetup({
    headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
  });
  await post(`${issuesUrl}/set_tags?issue=${issueKey}&tags=${tagsParam}`).fail(
    () => {
      console.log("Can't set tags to external issue");
    },
  );
}

async function setSeverityIssue(issueKey, severity) {
  ajaxSetup({
    headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
  });
  await post(
    `${issuesUrl}/set_severity?issue=${issueKey}&severity=${severity}`,
  ).fail(() => {
    console.log("Can't set severity to external issue");
  });
}

async function updateExternalIssues(projectKey, issueKey, ruleName) {
  const promises = [];
  for (let index = 0; index < jsRules.length; index += 1) {
    if (ruleName.includes(jsRules[index].ruleId)) {
      promises.push(setTagsIssue(issueKey, jsRules[index].tags));
      promises.push(setSeverityIssue(issueKey, jsRules[index].severity));
      break;
    }
  }
  await Promise.all(promises);

  const issue = await findIssue(projectKey, issueKey);
  if (issue) {
    return issue[0].issues[0];
  }
  return null;
}

// Return issues detected by Sonarqube
// !! only gather issues that are NOT closed !!
// projectKey: key of the project
// language: programming language
export async function findIssues(projectKey, language, branchLike) {
  const queryParams = [];
  let queryParam = new QueryParam('componentKeys', projectKey);
  queryParams.push(queryParam);

  const lang = language.split('-');
  queryParam = new QueryParam('languages', lang[0]);
  queryParams.push(queryParam);

   queryParam = new QueryParam('branch',branchLike );
  queryParams.push(queryParam);

  // List of possible values for issues
  const statuses = 'OPEN,CONFIRMED,REOPENED,RESOLVED';
  queryParams.push(new QueryParam('statuses', statuses));

  const response = await getPaginatedList(`${issuesUrl}/search`, queryParams);
  const result = [];
  const todo = [];

  // Boucle sur les pages extraites de la pagination
  for (let j = 0; j < response.length; j += 1) {
    // On récupère la page
    const res = response[j];

    for (let index = 0; index < res.issues.length; index += 1) {
      // On va traiter l'element
      const element = res.issues[index];

      // Si dans l'identifiant de la règle, il y a le pattern "greensight", je l'ajoute à mon tab d'issues
      if (element.rule.includes('greensight')) {
        if (element.rule.includes('external')) {
          if (element.tags.length === 0) {
            todo.push(
              updateExternalIssues(projectKey, element.key, element.rule),
            );
          } else result.push(element);
        } else result.push(element);
      }
    }
  }
  if (todo.length > 0) {
    result.push(await Promise.all(todo));
  }
  return result;
}

export async function findIssuesBySeverity(componentKey, severity) {
  const queryParams = [];
  const queryParam = new QueryParam('componentKeys', componentKey);
  const queryParam1 = new QueryParam('severities', severity);
  queryParams.push(queryParam);
  queryParams.push(queryParam1);

  const response = await getPaginatedList(`${issuesUrl}/search`, queryParams);
  const result = [];

  for (let j = 0; j < response.length; j += 1) {
    const res = response[j];

    for (let index = 0; index < res.issues.length; index += 1) {
      const element = res.issues[index];

      if (element.rule.includes('greensight')) {
        result.push(element);
      }
    }
  }
  return result;
}

export async function findComponentIssuesBySeverity(componentKey, severity) {
  const result = [];
  const extractedSeverityStoreKey = `${issuesUrl}/search/severity/${severity}`;

  const issues = await getStoredData(extractedSeverityStoreKey);
  for (let index = 0; index < issues.length; index += 1) {
    const element = issues[index];
    if (element.component.toLowerCase().includes(componentKey.toLowerCase())) {
      result.push(element);
    }
  }

  return result;
}

export async function findNumberIssuesOfEachRule() {
  const issues = await getStoredData(issuesStoreKey);

  let result = {};
  for (let index = 0; index < issues.length; index += 1) {
    const issue = issues[index];

    if (issue.rule.includes('greensight')) {
      if (Object.prototype.hasOwnProperty.call(result, issue.rule)) {
        result[issue.rule] += 1;
      } else {
        result[issue.rule] = 1;
      }
    }
  }
  result = Object.getOwnPropertyNames(result).map((ruleName) => ({
    val: ruleName,
    count: result[ruleName],
  }));
  return result;
}

export async function findIssuesGreensightByTag(projectKey, tag) {
  const queryParams = [];
  const queryParam = new QueryParam('componentKeys', projectKey);
  const queryParam1 = new QueryParam('tags', tag);
  queryParams.push(queryParam);
  queryParams.push(queryParam1);

  const response = await getPaginatedList(`${issuesUrl}/search`, queryParams);
  const result = [];

  for (let j = 0; j < response.length; j += 1) {
    const res = response[j];

    for (let index = 0; index < res.issues.length; index += 1) {
      const element = res.issues[index];

      result.push(element);
    }
  }
  return result;
}
