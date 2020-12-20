import createTask from 'controllers/task/create';
import getTask from 'controllers/task/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

/**
 * @function createTaskOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns a new task entry.
 */
const createTaskOperation = async (request, response) => {
  const task = request.body;
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  task.studentCode = studentCode;

  const newTask = await createTask(task);
  if (newTask) {
    return response.status(200).send(await getTask(newTask._id));
  } return response.sendStatus(400);
};

export default createTaskOperation;
