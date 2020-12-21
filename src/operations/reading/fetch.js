import fetchReading from 'controllers/reading/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const fetchReadingOperation = async (request, response) => {
  const { query } = request;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchReading(query));
};

export default fetchReadingOperation;
