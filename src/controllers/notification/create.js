import Notification from 'models/Notification';

const createNotification = async (notification) => {
  const newNotification = await Notification.create(notification);
  return newNotification;
};

export default createNotification;
