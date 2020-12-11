import axios from 'axios';

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
