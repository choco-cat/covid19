import React, { useState, useEffect } from 'react';
import { getCovidCountries, getSummaries, getDataWorld } from '../../api/covid';
import { getFlags } from "../../api/flags";
import { filters } from "../../constants/filters";
import Summary from '../summary';
import CountryList from '../countryList';
import WorldMap from '../worldMap';
import Graph from '../graph';

import './index.css';

const Root = () => {
  const [countries, setCountries] = useState( []);
  const [summaries, setSummaries] = useState( {});
  const [flags, setFlags] = useState( []);
  const [dataWorld, setDataWorld] = useState( []);
  const [indicatorsForFilter, updateIndicators] = useState( {
    status : filters.status.confirmed,
    period : filters.period.all,
    relative: filters.relative.absolute,
    geography: filters.geography,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCovidCountries();
      const summariesResult = await getSummaries();
      const flags = await getFlags();
      const dataWorld = await getDataWorld();

      setCountries(result);
      setSummaries(summariesResult);
      setFlags(flags);
      setDataWorld(dataWorld);
    };

    fetchData();
  }, []);

  const updateFilter = (newFilterParams) => {
    updateIndicators({
      ...indicatorsForFilter,
      ...newFilterParams
    });
  };

  const getDataForCountry = async (country) => {
    updateIndicators({
      ...indicatorsForFilter,
      geography: country
    });
  };

  // For checking
  console.log('filter', indicatorsForFilter);

  return (
      <div className="main-container">
        <CountryList
          summaries={summaries.Countries}
          flags={flags}
          filters={indicatorsForFilter}
          updateFilter={updateFilter}
          handleClickOnCountry={getDataForCountry}
        />
        <WorldMap summaries={summaries.Countries} filters={indicatorsForFilter} handleClickOnCountry={getDataForCountry} />
        <div className="summary-container">
          <Summary summaries={summaries.Global} filters={indicatorsForFilter} />
          <Graph dataWorld={dataWorld} filters={indicatorsForFilter} />
        </div>
      </div>
  );
};

export default Root;
