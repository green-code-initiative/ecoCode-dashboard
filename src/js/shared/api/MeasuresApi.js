import { getJSON } from 'sonar-request';
import { measuresURL } from '../common/apiUrls';
import QueryParam from './utils/QueryParam';
import getPaginatedList from './utils/Pageable';

export async function findTotalAppCodeLines(projectKey,branchLike) {
  return getJSON(
    `${measuresURL}/component?component=${projectKey}&branch=${branchLike}&metricKeys=ncloc`,
  ).then((response) => {
    if (response) {
      return response.component.measures[0].value;
    }
    return null;
  });
}

export async function findCodeLinesOfComponent(component) {
  return getJSON(
    `${measuresURL}/component?component=${component}&metricKeys=ncloc`,
  ).then((response) => {
    if (response.component.measures.length > 0) {
      return response.component.measures[0].value;
    }
    return null;
  });
}

export async function findAllComponents(projectKey, qualifiers) {
  const queryParams = [];
  const queryParam = new QueryParam('component', projectKey);
  const queryParam3 = new QueryParam('metricKeys', 'ncloc');
  const queryParam4 = new QueryParam('strategy', 'children');
  queryParams.push(queryParam);
  queryParams.push(queryParam3);
  queryParams.push(queryParam4);

  if (qualifiers) {
    const queryParam1 = new QueryParam('qualifiers', qualifiers);
    queryParams.push(queryParam1);
  }
  const response = await getPaginatedList(
    `${measuresURL}/component_tree`,
    queryParams,
  );
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
