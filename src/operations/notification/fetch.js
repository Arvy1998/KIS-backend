import fetchNotification from 'controllers/notification/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const fetchNotificationOperation = async (request, response) => {
  const { query } = request;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchNotification(query));
};

export default fetchNotificationOperation;
