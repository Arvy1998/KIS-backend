import fetchService from 'controllers/service/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const fetchServiceOperation = async (request, response) => {
  const { query } = request;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchService(query));
};

export default fetchServiceOperation;
