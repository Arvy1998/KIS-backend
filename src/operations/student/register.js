import registerStudent from 'controllers/student/register';

import signToken from 'utils/signToken';

/**
 * @function registerStudentOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns a new student's entry.
 */
const registerStudentOperation = async (request, response) => {
  const student = request.body;

  const registeredStudent = await registerStudent(student);

  if (registeredStudent) {
    const token = await signToken(registeredStudent);

    response.setHeader('Authorization', `Bearer ${token}`);
    return response.status(200).send(registeredStudent);
  } return response.sendStatus(400);
};

export default registerStudentOperation;
