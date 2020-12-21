import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: String,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
