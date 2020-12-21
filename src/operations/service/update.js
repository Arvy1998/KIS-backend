import updateService from 'controllers/service/update';
import getService from 'controllers/service/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const updateServiceOperation = async (request, response) => {
  const { serviceId } = request.params;
  const service = request.body;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const updated = await updateService(serviceId, service);
  if (updated) return response.status(200).send(await getService(updated._id));
  return response.sendStatus(404);
};

export default updateServiceOperation;
