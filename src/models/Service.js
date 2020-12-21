import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'WATER',
      'ENERGY',
      'HEAT',
      'PHONE',
      'INTERNET',
      'TV',
      'MANUAL',
    ],
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  unit: String,
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
