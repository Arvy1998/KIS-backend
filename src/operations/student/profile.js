import profileStudent from 'controllers/student/profile';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function profileStudentOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns an existing student entry
 * with more detailed information.
 */
const profileStudentOperation = async (request, response) => {
  const { studentCode } = request.params;
  const studentCodeForAuth = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCodeForAuth) {
    throw new UserNotAuthorized();
  }

  const student = await profileStudent(studentCode);

  if (student) {
    return response.status(200).send(student);
  } return response.sendStatus(404);
};

export default profileStudentOperation;
