// import { getJSON } from 'sonar-request';
import { usersUrl } from '../../common/apiUrls';

export default class UserService {
  static async findCurrentUser() {
    return getJSON(`${usersUrl}/current`).then((response) => response);
  }
}
