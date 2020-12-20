import Task from 'models/Task';

/**
 * @function updateTask
 * Updates existing task's entry from database.
 * @param {String} taskId The task's mongo id value.
 * @param {Object} task The task's entity body.
 * @param {String} task.lecturerId The mongo id value of the lecturer.
 * @param {String} task.disciplineId The mongo id value of the discipline.
 * @param {String} task.type The type of the defined task, may be one of the
 * following enumerator values: [LABORATORY_WORK, TEST_WORK, COURSE_WORK,
 * HOME_WORK, EXAMINATION, SEMI_EXAMINATION, THESIS_WORK].
 * @param {String} task.studentCode The owner of the task.
 * @param {Boolean} task.isDone The boolean flag value indicating
 * the status of the task completion.
 * @param {String} task.description The more information about task.
 * @param {String} task.dueDate Deadline date-time value for certain task.
 * @returns {(Object|Boolean)} Returns updated task entity
 * or boolean value indicating that the task was not updated.
 */
const updateTask = async (taskId, task) => {
  const updated = await Task.findOneAndUpdate(
    { _id: taskId }, task, { new: true, useFindAndModify: false },
  );
  if (updated) return updated;
  return false;
};

export default updateTask;
