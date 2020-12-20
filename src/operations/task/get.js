import getTask from 'controllers/task/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function getTaskOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns an existing task entry.
 */
const getTaskOperation = async (request, response) => {
  const { taskId } = request.params;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  const task = await getTask(taskId);

  if (task) {
    return response.status(200).send(task);
  } return response.sendStatus(404);
};

export default getTaskOperation;
