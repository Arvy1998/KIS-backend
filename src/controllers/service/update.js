import Service from 'models/Service';

const updateService = async (serviceId, service) => {
  const updated = await Service.findOneAndUpdate(
    { _id: serviceId }, service, { new: true, useFindAndModify: false },
  );
  if (updated) return updated;
  return false;
};

export default updateService;
