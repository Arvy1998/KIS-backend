/**
 * @class UserNotAuthorized
 * Error class for user not authorized cases.
 * @extends Error
 */
class UserNotAuthorized extends Error {
  constructor() {
    super('User could not be authorized...');
  }
}

export default UserNotAuthorized;
