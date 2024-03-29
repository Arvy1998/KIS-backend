import User from 'models/User';

const getUser = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return {
      _id: user._id,
      email,
      password: user.password,
      name: user.name,
      phone: user.phone,
    };
  } else return false;
};

export default getUser;
