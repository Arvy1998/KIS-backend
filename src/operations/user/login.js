import login from 'controllers/user/login';

import signToken from 'utils/signToken';

const loginUserOperation = async (request, response) => {
  const user = request.body;

  const signedIn = await login(user);

  if (signedIn) {
    const token = await signToken(signedIn);

    response.setHeader('Authorization', `Bearer ${token}`);
    return response.status(200).send(signedIn);
  } return response.sendStatus(400);
};

export default loginUserOperation;
