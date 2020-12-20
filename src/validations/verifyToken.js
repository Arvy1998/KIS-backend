import jwt, { TokenExpiredError } from 'jsonwebtoken';
import fs from 'fs';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function verifyToken
 * Validates token on the request message.
 * @param {Object} request The request message.
 * @returns {Object} Returns student's entity or
 * error object in case of failure.
 */
const verifyToken = async (request) => {
  const privatekey = fs.readFileSync(`${__dirname}/../ssl/service.key`);

  const token = request.headers.authorization;

  if (!token) throw new UserNotAuthorized();

  return new Promise((resolve) => {
    jwt.verify(token.split(' ')[1], privatekey, (error, student) => {
      if (error instanceof TokenExpiredError) throw new TokenExpiredError();
      else if (error) throw new UserNotAuthorized();
      else resolve(student);
    });
  });
};

export default verifyToken;
