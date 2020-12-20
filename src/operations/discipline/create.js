import createDiscipline from 'controllers/discipline/create';

import verifyToken from 'validations/verifyToken';
import isAdmin from 'validations/isAdmin';

import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserNotAdmin from 'errors/UserNotAdmin';

/**
 * @function createDisciplineOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns a new discipline entry.
 */
const createDisciplineOperation = async (request, response) => {
  const discipline = request.body;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  if (!(await isAdmin(studentCode))) {
    throw new UserNotAdmin();
  }

  const newDiscipline = await createDiscipline(discipline);

  if (newDiscipline) {
    return response.status(200).send(newDiscipline);
  } return response.sendStatus(400);
};

export default createDisciplineOperation;
