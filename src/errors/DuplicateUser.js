/**
 * @class DuplicateUser
 * Error class for duplicate user during registration.
 * @extends Error
 */
class DuplicateUser extends Error {
  constructor() {
    super('User is already registered...');
  }
}

export default DuplicateUser;
