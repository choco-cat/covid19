import axios from 'axios';

const cache = {};

//TODO добавить обработчик ошибок

/*
Список флагов
Возвращает массив из объектов вида data[n], флаг - data[n].flag, название страны - data[n].name, население - data[n].population
*/

export const getFlags = async () => {
    const url =  'https://restcountries.eu/rest/v2/all?fields=name;population;flag';
    const { data: flags } = await axios.get(url);
    return flags;
};

/*
Возвращает количество населения страны country_slug
*/

export const getPopulationCountry = async (country_slug) => {
    const url =  `https://restcountries.eu/rest/v2/name/${country_slug}`;
    const { data: country } = await axios.get(url);
    const [result] = country.filter((el) => el.name.toLowerCase() === country_slug);

    return result.population;
};
