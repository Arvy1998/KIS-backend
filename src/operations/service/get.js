import getService from 'controllers/service/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const getServiceOperation = async (request, response) => {
  const { serviceId } = request.params;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const service = await getService(serviceId);

  if (service) {
    return response.status(200).send(service);
  } return response.sendStatus(404);
};

export default getServiceOperation;
