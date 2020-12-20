import User from 'models/User';

import bcrypt from 'bcrypt';

import DuplicateUser from 'errors/DuplicateUser';

const register = async (user) => {
  /* more than one user can not have same email */
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) throw new DuplicateUser();

  /* encrypt password before saving it to the mongo database */
  const passwordHash = await bcrypt.hash(user.password, 10);
  const userToRegister = user;
  userToRegister.password = passwordHash;

  const registeredUser = await User.create(userToRegister);
  return registeredUser;
};

export default register;
