import register from 'controllers/user/register';

import signToken from 'utils/signToken';

const registerUserOperation = async (request, response) => {
  const user = request.body;

  const registeredUser = await register(user);

  if (registeredUser) {
    const token = await signToken(registeredUser);

    response.setHeader('Authorization', `Bearer ${token}`);
    return response.status(200).send(registeredUser);
  } return response.sendStatus(400);
};

export default registerUserOperation;
