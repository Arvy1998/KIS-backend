import createDisciplineLecturer from 'controllers/disciplineLecturer/create';

import verifyToken from 'validations/verifyToken';
import isAdmin from 'validations/isAdmin';

import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserNotAdmin from 'errors/UserNotAdmin';

/**
 * @function createDisciplineLecturerOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns a new relationship between
 * lecturer's and discipline's entities.
 */
const createDisciplineLecturerOperation = async (request, response) => {
  const relationship = request.body;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  if (!(await isAdmin(studentCode))) {
    throw new UserNotAdmin();
  }

  const newRelationship = await createDisciplineLecturer(relationship);

  if (newRelationship) {
    return response.status(200).send(newRelationship);
  } return response.sendStatus(400);
};

export default createDisciplineLecturerOperation;
