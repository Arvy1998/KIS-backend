import fetchReading from 'controllers/reading/fetch';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const fetchReadingOperation = async (request, response) => {
  const { 
    serviceId,
    date,
    period,
  } = request.query;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  return response.send(await fetchReading(serviceId, date, period));
};

export default fetchReadingOperation;
