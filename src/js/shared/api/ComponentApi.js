import { getJSON } from 'sonar-request';
import { componentsUrl } from '../common/apiUrls';
import getPaginatedList from './utils/Pageable';
import QueryParam from './utils/QueryParam';

export async function findComponent(componentKey, branchLike) {
  return getJSON(`${componentsUrl}/show?component=${componentKey}&branch=${branchLike}`).then(
    (response) => response,
  );
}

export async function findAllComponents(projectKey, qualifiers) {
  const queryParams = [];
  const queryParam = new QueryParam('component', projectKey);
  queryParams.push(queryParam);
  if (qualifiers) {
    const queryParam1 = new QueryParam('qualifiers', qualifiers);
    queryParams.push(queryParam1);
  }

  const response = await getPaginatedList(`${componentsUrl}/tree`, queryParams);
  const result = [];

  for (let j = 0; j < response.length; j += 1) {
    const res = response[j];

    for (let index = 0; index < res.components.length; index += 1) {
      const element = res.components[index];
      result.push(element);
    }
  }
  return result;
}

export async function findComponentChildren(componentKey, qualifiers) {
  const queryParams = [];
  const queryParam = new QueryParam('component', componentKey);
  const queryParam1 = new QueryParam('qualifiers', qualifiers);
  queryParams.push(queryParam);
  queryParams.push(queryParam1);

  const response = await getPaginatedList(`${componentsUrl}/tree`, queryParams);
  const result = [];

  for (let j = 0; j < response.length; j += 1) {
    const res = response[j];

    for (let index = 0; index < res.components.length; index += 1) {
      const element = res.components[index];
      result.push(element);
    }
  }
  return result;
}
