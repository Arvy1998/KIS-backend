import removeReading from 'controllers/reading/remove';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const removeReadingOperation = async (request, response) => {
  const { readingId } = request.params;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }
  
  const removed = await removeReading(readingId);
  if (removed) return response.status(200).send('OK');
  return response.sendStatus(404);
};

export default removeReadingOperation;
