import removeTask from 'controllers/task/remove';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function removeTaskOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns status code indicating
 * deletion operation success or failure.
 */
const removeTaskOperation = async (request, response) => {
  const { taskId } = request.params;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  const removed = await removeTask(taskId);
  if (removed) return response.status(200).send('OK');
  return response.sendStatus(404);
};

export default removeTaskOperation;
