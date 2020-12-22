import Reading from 'models/Reading';
import Notification from 'models/Notification';

const createReading = async (reading) => {
  const newReading = await Reading.create(reading);

  const notification = await Notification.findOne({
    serviceId: newReading.serviceId,
  });

  if (notification && notification.triggerValue >= newReading.value) {
    // notification lol
  }

  return newReading;
};

export default createReading;
