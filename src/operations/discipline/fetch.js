import fetchDiscipline from 'controllers/discipline/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function fetchDisciplineOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object<Array>} Returns the discipline's
 * entity list.
 */
const fetchDisciplineOperation = async (request, response) => {
  const { query } = request;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchDiscipline(query));
};

export default fetchDisciplineOperation;
