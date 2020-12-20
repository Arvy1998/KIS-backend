import removeLecturer from 'controllers/lecturer/remove';

import verifyToken from 'validations/verifyToken';
import isAdmin from 'validations/isAdmin';

import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserNotAdmin from 'errors/UserNotAdmin';

/**
 * @function removeLecturerOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns status code indicating
 * deletion operation success or failure.
 */
const removeLecturerOperation = async (request, response) => {
  const { lecturerId } = request.params;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  if (!(await isAdmin(studentCode))) {
    throw new UserNotAdmin();
  }

  const removed = await removeLecturer(lecturerId);
  if (removed) return response.status(200).send('OK');
  return response.sendStatus(404);
};

export default removeLecturerOperation;
