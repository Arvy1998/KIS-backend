import createService from 'controllers/service/create';
import getService from 'controllers/service/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const createServiceOperation = async (request, response) => {
  const service = request.body;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  service.userId = loggedIn.userId;

  const newService = await createService(service);
  if (newService) {
    return response.status(200).send(await getService(newService._id));
  } return response.sendStatus(400);
};

export default createServiceOperation;
