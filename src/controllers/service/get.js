import Service from 'models/Service';

const getService = async (serviceId) => {
  const service = await Service.findById(serviceId);
  if (service) {
    return service;
  }
  return false;
};

export default getService;
