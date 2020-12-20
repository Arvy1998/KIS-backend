import fetchFile from 'controllers/file/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function fetchFileOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object<Array>} Returns the file's
 * entity list with more detailed information.
 */
const fetchFileOperation = async (request, response) => {
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchFile());
};

export default fetchFileOperation;
