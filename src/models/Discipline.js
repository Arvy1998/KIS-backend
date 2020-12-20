import mongoose from 'mongoose';

const disciplineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  aliases: { type: [String] },
});

const Discipline = mongoose.model('Discipline', disciplineSchema);

export default Discipline;
