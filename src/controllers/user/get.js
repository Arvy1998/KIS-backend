import User from 'models/User';

const getUser = async (email) => {
  const user = await User.findOne({ email });
  console.log({user});
  if (student) {
    return {
      _id: user._id,
      email,
      password: user.password,
      name: user.name,
      phone: user.name,
    };
  } else return false;
};

export default getUser;
