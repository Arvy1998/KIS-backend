import updateTask from 'controllers/task/update';
import getTask from 'controllers/task/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function updateTaskOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns status code indicating
 * deletion operation success or failure.
 */
const updateTaskOperation = async (request, response) => {
  const { taskId } = request.params;
  const task = request.body;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  const updated = await updateTask(taskId, task);
  if (updated) return response.status(200).send(await getTask(updated._id));
  return response.sendStatus(404);
};

export default updateTaskOperation;
