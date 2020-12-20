import Task from 'models/Task';

/**
 * @function removeTask
 * Removes existing task's entry from database.
 * @param {String} taskId The task's mongo id value.
 * @returns {Boolean} Returns deletion operation status
 * by sending boolean value.
 */
const removeTask = async (taskId) => {
  const removed = await Task.deleteOne({ _id: taskId });
  if (removed.deletedCount !== 0) return true;
  return false;
};

export default removeTask;
