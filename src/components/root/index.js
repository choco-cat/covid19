import React, { useState, useEffect } from 'react';
import { getCovidCountries, getSummaries, getDataWorldFromDays, getDataCountryFromDays } from '../../api/covid';
import { getFlags } from "../../api/flags";
import { filters } from "../../constants/filters";
import Summary from '../summary';
import CountryList from '../countryList';
import WorldMap from '../worldMap';
import Graph from '../graph';
import { getData, getDataWorldLastDay } from '../../services/calculations';

import '../../styles/main.scss';

const Root = () => {
  const [summaries, setSummaries] = useState({});
  const [flags, setFlags] = useState([]);
  const [dataWorldFromDays, setDataWorld] = useState([]);
  const [dataCountryFromDays, setDataCountry] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [indicatorsForFilter, updateIndicators] = useState({
    status: filters.status.confirmed,
    period: filters.period.all,
    relative: filters.relative.absolute,
    geography: filters.geography,
  });

  useEffect(() => {
    const fetchData = async () => {
      const summariesResult = await getSummaries();
      const dataWorldFromDaysResult = await getDataWorldFromDays();
      const flagsResult = await getFlags();

      summariesResult.Countries = summariesResult.Countries.map(country => {
        const isFind = flagsResult.find(flag => flag.name === country.Country);
        return {
          ...country,
          //TODO недостающие страны,флаги пофиксить
          population: isFind ? isFind.population : 1,
          flag: isFind ? isFind.flag : '',
        }
      });

      setSummaries(summariesResult);
      setDataWorld(dataWorldFromDaysResult);
      setFlags(flagsResult);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  useEffect(() => {
    //TODO рефакторить этот код!!!
    if (indicatorsForFilter.geography) {
      const country = indicatorsForFilter.geography;
      let population = 1;

      if (flags.find(flag => flag.name === country)) {
        population = flags.find(flag => flag.name === country).population;
      }
      if (indicatorsForFilter.period === filters.period.all) {
        setDataAll(getData(dataCountryFromDays, indicatorsForFilter, population));
      } else {
        const currentCountry = summaries.Countries.find(el => el.Country === country);
        setDataAll(getData([currentCountry], indicatorsForFilter, population));
      }
    } else {
      if (indicatorsForFilter.period === filters.period.all) {
        setDataAll(getData(dataWorldFromDays, indicatorsForFilter));
      } else {
        setDataAll(getData([summaries.Global], indicatorsForFilter));
      }
    }
  }, [indicatorsForFilter, summaries, dataWorldFromDays, dataCountryFromDays]);

  const updateFilter = (newFilterParams) => {
    updateIndicators({
      ...indicatorsForFilter,
      ...newFilterParams
    });
  };

  const getDataForCountry = async (country) => {
    //Тут уже страна выбрана
    updateIndicators({
      ...indicatorsForFilter,
      geography: country
    });

    const dataCountryFromDaysResult = await getDataCountryFromDays(country);
    setDataCountry(dataCountryFromDaysResult);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="main-container">
        <CountryList
          summaries={summaries.Countries}
          flags={flags}
          filters={indicatorsForFilter}
          updateFilter={updateFilter}
          handleClickOnCountry={getDataForCountry}
        />
        <WorldMap summaries={summaries.Countries} filters={indicatorsForFilter}
                  handleClickOnCountry={getDataForCountry}/>
        <div className="summary-container">
          <Summary summaries={summaries.Global} filters={indicatorsForFilter}/>
          <Graph dataWorld={dataAll} filters={indicatorsForFilter}/>
        </div>
      </div>
    );
  }
};

export default Root;
