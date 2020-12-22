import updateNotification from 'controllers/notification/update';
import getNotification from 'controllers/notification/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const updateNotificationOperation = async (request, response) => {
  const { notificationId } = request.params;
  const notification = request.body;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const updated = await updateNotification(notificationId, notification);
  if (updated) return response.status(200).send(await getNotification(updated._id));
  return response.sendStatus(404);
};

export default updateNotificationOperation;
