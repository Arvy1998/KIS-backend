import Service from 'models/Service';

const removeService = async (serviceId) => {
  const removed = await Service.deleteOne({ _id: serviceId });
  if (removed.deletedCount !== 0) return true;
  return false;
};

export default removeService;
