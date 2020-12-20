import Task from 'models/Task';
import Lecturer from 'models/Lecturer';
import Discipline from 'models/Discipline';

/**
 * @function getTask
 * Gathers existing task's entry from database.
 * @param {String} taskId The task's mongo id value.
 * @returns {(Object|Boolean)} Returns task's entity
 * if it's found and returns false boolean value if
 * requested task by mongo id value is not found.
 */
const getTask = async (taskId) => {
  const task = await Task.findById(taskId);
  if (task) {
    const taskObject = task.toObject();
    const lecturer = await Lecturer.findById(task.lecturerId);
    const discipline = await Discipline.findById(task.disciplineId);

    delete taskObject.lecturerId;
    delete taskObject.disciplineId;

    return {
      lecturer,
      discipline,
      ...taskObject,
    };
  }
  return false;
};

export default getTask;
