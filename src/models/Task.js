import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  lecturerId: {
    type: String,
    required: true,
    index: true,
  },
  disciplineId: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'LABORATORY_WORK',
      'TEST_WORK',
      'COURSE_WORK',
      'HOME_WORK',
      'EXAMINATION',
      'SEMI_EXAMINATION',
      'THESIS_WORK',
    ],
  },
  studentCode: {
    type: String,
    required: true,
    index: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  description: { type: String },
  dueDate: { type: Date },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
