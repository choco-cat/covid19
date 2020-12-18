import React, { useState, useEffect } from 'react';
import ClockLoader from "react-spinners/ClockLoader";
import { getSummaries, getDataWorldFromDays, getDataCountryFromDays } from '../../api/covid';
import { getFlags } from "../../api/flags";
import { filters } from "../../constants/filters";
import Summary from '../summary';
import CountryList from '../countryList';
import WorldMap from '../worldMap';
import Graph from '../graph';
import { getData } from '../../services/calculations';
import { missedPopulations, missedFlags } from '../../constants/missed';
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
        return {
          ...country,
          population: missedPopulations[country.Country] || flagsResult.find(flag => flag.name === country.Country).population,
          flag: missedFlags[country.Country] || flagsResult.find(flag => flag.name === country.Country).flag,
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
    if (indicatorsForFilter.geography) {
      const country = indicatorsForFilter.geography;
      const population = missedPopulations[country] || flags.find(flag => flag.name === country).population;
      setDataAll(getData(dataCountryFromDays, indicatorsForFilter, population));
    } else {
      setDataAll(getData(dataWorldFromDays, indicatorsForFilter));
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

  return (
    <div className="main-container">
      {
        !isLoaded ? (
          <div className="main-loader">
            <ClockLoader
              size={100}
              color={"#ff3440"}
              loading={!isLoaded}
            />
          </div>
        ) : (
          <>
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
          </>
        )
      }
    </div>
  );
};

export default Root;
