import { getJSON } from 'sonar-request';
import { rulesUrl } from '../common/apiUrls';
import getPaginatedList from './utils/Pageable';
import QueryParam from './utils/QueryParam';

export async function findRuleWithKey(ruleKey) {
  return getJSON(`${rulesUrl}/search?rule_key=${ruleKey}`).then(
    (response) => response.rules[0],
  );
}

export async function findRulesByTag(tag) {
  const queryParams = [];
  const queryParam = new QueryParam('tags', tag);
  queryParams.push(queryParam);

  const response = await getPaginatedList(`${rulesUrl}/search`, queryParams);
  const result = [];

  for (let j = 0; j < response.length; j += 1) {
    const res = response[j];

    for (let index = 0; index < res.rules.length; index += 1) {
      const element = res.rules[index];

      if (element.key.includes('greensight')) {
        result.push(element);
      }
    }
  }
  return result;
}
export async function findRulesGreensight(...repositories) {
  const queryParams = [];
  let paramValues = '';
  if (repositories) {
    paramValues = repositories.join(',');
  }
  const param = new QueryParam('repositories', paramValues);

  queryParams.push(param);

  const response = await getPaginatedList(`${rulesUrl}/search`, queryParams);
  const result = [];

  for (let j = 0; j < response.length; j += 1) {
    const res = response[j];

    for (let index = 0; index < res.rules.length; index += 1) {
      const element = res.rules[index];

      result.push(element);
    }
  }
  return result;
}
