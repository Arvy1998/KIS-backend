import getNotification from 'controllers/notification/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const getNotificationOperation = async (request, response) => {
  const { notificationId } = request.params;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const notification = await getNotification(notificationId);

  if (notification) {
    return response.status(200).send(notification);
  } return response.sendStatus(404);
};

export default getNotificationOperation;
