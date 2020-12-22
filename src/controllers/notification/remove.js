import Notification from 'models/Notification';

const removeNotification = async (notificationId) => {
  const removed = await Notification.deleteOne({ _id: notificationId });
  if (removed.deletedCount !== 0) return true;
  return false;
};

export default removeNotification;
