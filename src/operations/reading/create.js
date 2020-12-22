import createReading from 'controllers/reading/create';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const createReadingOperation = async (request, response) => {
  const reading = request.body;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const newReading = await createReading(reading, loggedIn.userId);

  if (newReading) {
    return response.status(200).send(newReading);
  } return response.sendStatus(400);
};

export default createReadingOperation;
