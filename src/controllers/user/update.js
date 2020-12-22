import User from 'models/User';

const updateUser = async (userId, user) => {
  const updated = await User.findOneAndUpdate(
    { _id: userId }, user, { new: true, useFindAndModify: false },
  );
  if (updated) return updated;
  return false;
};

export default updateUser;
