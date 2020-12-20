import fetchTask from 'controllers/task/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function fetchTaskOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object<Array>} Returns the task's
 * entity list.
 */
const fetchTaskOperation = async (request, response) => {
  const { query } = request;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchTask(query));
};

export default fetchTaskOperation;
