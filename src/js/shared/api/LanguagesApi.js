import { getJSON } from 'sonar-request';
import { langUrl } from '../common/apiUrls';

export default async function findLanguages() {
  const response = await getJSON(`${langUrl}`);
  return response.languages;
}
