// import { getJSON } from 'sonar-request';

export default async function getPaginatedList(
  uri,
  params,
  page = 1,
  pageSize = 500,
) {
  let result = [];
  let totalPages = 0;
  let totalElements = 0;
  const separator = '&';
  let queryParams = '';
  if (params) {
    // On gère le premier paramètre obligatoire
    queryParams = `${params[0].key}=${params[0].value}`;

    // Boucle pour si il y a d'autres paramètres GET
    for (let index = 1; index < params.length; index += 1) {
      const param = params[index];
      queryParams += `${separator + param.key}=${param.value}`;
    }
  }
  do {
    const response = await getJSON(
      `${uri}?p=${page}&ps=${pageSize}&${queryParams}`,
    );
    if (response.paging) {
      totalElements = response.paging.total;
    } else if (response.total) {
      totalElements = response.total;
    }

    totalPages = Math.ceil(totalElements / pageSize);
    result = result.concat(response);
    page += 1;
  } while (page <= totalPages);

  return result;
}
