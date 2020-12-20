import Task from 'models/Task';
import Lecturer from 'models/Lecturer';
import Discipline from 'models/Discipline';

const fetchTask = async (query) => {
  const tasks = await Task.find(query);

  const tasksToReturn = [];
  await Promise.all(tasks.map(async (task) => {
    const taskObject = task.toObject();
    const lecturer = await Lecturer.findById(task.lecturerId);


    delete taskObject.lecturerId;
    delete taskObject.disciplineId;

    tasksToReturn.push({
      lecturer,
      discipline,
      ...taskObject,
    });
  }));

  /* return task entries sorted by due date field so the frontend will look fancier */
  return tasksToReturn.sort((current, next) => new Date(next.dueDate) - new Date(current.dueDate));
};

export default fetchTask;
