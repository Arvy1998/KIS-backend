import mongoose from 'mongoose';

const lecturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

export default Lecturer;
