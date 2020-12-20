import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: { type: String, index: true, required: true },
  mime: String,
  size: Number,
  studentCode: { type: String, required: true },
  uploadedAt: Date,
});

const File = mongoose.model('File', fileSchema);

export default File;
