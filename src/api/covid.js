import axios from 'axios';

const BASE_URL = 'https://api.covid19api.com/';

//TODO добавить обработчик ошибок

/*
Список стран
Возвращает массив из объектов вида data[n], country_slug - data[n].Slug, название страны - data[n].Country
*/
export const getCovidCountries = async () => {
  const endPointCountries = 'countries';
  const { data: countries } = await axios.get(`${BASE_URL}${endPointCountries}`);
  return countries;
};

/*
Возвращает массив объектов вида data[n], количество data[n].Cases случаев status за дату data[n].Date
по стране с country_slug = country_slug
Если не указан status, будут еще data[n].Lat, data[n].Lon, data[n].Confirmed., data[n].Deaths,
data[n].Recovered, data[n].Active
status = confirmed, recovered, deaths
*/
export const getStatusesOfCountry = async (country_slug, status = null) => {
  const endPointCountries = `dayone/country/${country_slug}${status ? '/status/' + status : ''}`;
  return await axios.get(`${BASE_URL}${endPointCountries}`);
};


export const getSummaries = async () => {
  const endPointCountries = 'summary';
  const { data: summaries } =  await axios.get(`${BASE_URL}${endPointCountries}`);
  return summaries;
};