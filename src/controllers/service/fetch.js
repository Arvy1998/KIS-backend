import Service from 'models/Service';

const fetchService = async (query) => {
  const services = await Service.find(query);

  
};

export default fetchService;
