import createLecturer from 'controllers/lecturer/create';

import verifyToken from 'validations/verifyToken';
import isAdmin from 'validations/isAdmin';

import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserNotAdmin from 'errors/UserNotAdmin';

/**
 * @function createLecturerOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns a new lecturer entry.
 */
const createLecturerOperation = async (request, response) => {
  const lecturer = request.body;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  if (!(await isAdmin(studentCode))) {
    throw new UserNotAdmin();
  }

  const newLecturer = await createLecturer(lecturer);

  if (newLecturer) {
    return response.status(200).send(newLecturer);
  } return response.sendStatus(400);
};

export default createLecturerOperation;
