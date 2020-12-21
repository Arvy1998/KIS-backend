import mongoose from 'mongoose';

const readingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  value: Number,
  serviceId: {
    type: String,
    required: true,
  },
});

const Reading = mongoose.model('Reading', readingSchema);

export default Reading;
