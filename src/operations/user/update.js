import updateUser from 'controllers/user/update';
import getUser from 'controllers/user/get';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

const updateUserOperation = async (request, response) => {
  const { userId } = request.params;
  const user = request.body;

  const loggedIn = await verifyToken(request);

  if (!loggedIn) {
    throw new UserNotAuthorized();
  }

  const updated = await updateUser(userId, user);
  if (updated) return response.status(200).send(await getUser(updated._id));
  return response.sendStatus(404);
};

export default updateUserOperation;
