import mongoose from 'mongoose';

const lecturerDisciplineSchema = new mongoose.Schema({
  disciplineId: {
    type: String,
    required: true,
    index: true,
  },
  lecturerId: {
    type: String,
    required: true,
    index: true,
  },
});

const LecturerDiscipline = mongoose.model('LecturerDiscipline', lecturerDisciplineSchema);

export default LecturerDiscipline;
