import getUser from 'controllers/user/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const getUserOperation = async (request, response) => {
  const { email } = request.query;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const user = await getUser(email);

  if (user) {
    return response.status(200).send(user);
  } return response.sendStatus(404);
};

export default getUserOperation;
