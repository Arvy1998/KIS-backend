import removeNotification from 'controllers/notification/remove';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const removeNotificationOperation = async (request, response) => {
  const { notificationId } = request.params;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const removed = await removeNotification(notificationId);
  if (removed) return response.status(200).send('OK');
  return response.sendStatus(404);
};

export default removeNotificationOperation;
