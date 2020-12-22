import Notification from 'models/Notification';

const getNotification = async (notificationId) => {
  const notification = await Notification.findById(notificationId);
  if (notification) {
    return notification;
  }
  return false;
};

export default getNotification;
