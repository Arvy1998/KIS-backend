import removeService from 'controllers/service/remove';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const removeServiceOperation = async (request, response) => {
  const { serviceId } = request.params;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const removed = await removeService(serviceId);
  if (removed) return response.status(200).send('OK');
  return response.sendStatus(404);
};

export default removeServiceOperation;
