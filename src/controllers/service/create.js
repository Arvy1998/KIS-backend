import Service from 'models/Service';

const createService = async (service) => {
  const newService = await Service.create(service);
  return newService;
};

export default createService;
