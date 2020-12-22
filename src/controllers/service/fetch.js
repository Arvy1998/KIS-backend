import Service from 'models/Service';

const fetchService = async (query) => {
  const services = await Service.find(query);

  return services;
};

export default fetchService;
