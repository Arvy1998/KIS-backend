import Notification from 'models/Notification';

const updateNotification = async (notificationId, notification) => {
  const updated = await Notification.findOneAndUpdate(
    { _id: notificationId }, notification, { new: true, useFindAndModify: false },
  );
  if (updated) return updated;
  return false;
};

export default updateNotification;
