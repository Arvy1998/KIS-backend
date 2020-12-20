import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentCode: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
