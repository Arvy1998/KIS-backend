import User from 'models/User';

import bcrypt from 'bcrypt';

import UserDoesNotExist from 'errors/UserDoesNotExist';
import PasswordsMissmatch from 'errors/PasswordsMissmatch';

const login = async (user) => {
  const userWithHash = await User.findOne({ email: user.email });
  if (!userWithHash) {
    throw new UserDoesNotExist();
  }

  const match = new Promise((resolve, reject) => {
    bcrypt.compare(user.password, userWithHash.password, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  if (!(await match)) {
    throw new PasswordsMissmatch();
  } else return userWithHash;
};

export default login;
