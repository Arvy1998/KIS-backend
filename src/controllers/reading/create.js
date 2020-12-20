import Reading from 'models/Reading';

const createReading = async (reading) => {
  const newReading = await Reading.create(reading);
  return newReading;
};

export default createReading;
