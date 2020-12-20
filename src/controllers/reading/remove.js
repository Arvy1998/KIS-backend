import Reading from 'models/Reading';

const removeReading = async (readingId) => {
  const removed = await Reading.deleteOne({ _id: readingId });
  if (removed.deletedCount !== 0) return true;
  return false;
};

export default removeReading;
