import Notification from 'models/Notification';

const fetchNotification = async (query) => {
  const notifications = await Notification.find(query);

  return notifications;
};

export default fetchNotification;
