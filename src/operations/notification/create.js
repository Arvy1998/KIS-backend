import createNotification from 'controllers/notification/create';
import getNotification from 'controllers/notification/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const createNotificationOperation = async (request, response) => {
  const notification = request.body;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  notification.userId = loggedIn.userId;

  const newNotification = await createNotification(notification);
  if (newNotification) {
    return response.status(200).send(await getNotification(newNotification._id));
  } return response.sendStatus(400);
};

export default createNotificationOperation;
