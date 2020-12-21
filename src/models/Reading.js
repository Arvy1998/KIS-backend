import mongoose from 'mongoose';

const readingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  value: Number,
});

const Reading = mongoose.model('Reading', readingSchema);

export default Reading;
