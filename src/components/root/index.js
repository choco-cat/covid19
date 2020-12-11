import React, { useState, useEffect } from 'react';
import { getCovidCountries, getSummaries } from '../../api/covid';
import { getFlags } from "../../api/flags";
import Summary from '../summary';
import CountryList from '../countryList';
import World_map from '../World_map';
import Graph from '../graph';

import './index.css';

const Root = () => {
  const [countries, setCountries] = useState( []);
  const [summaries, setSummaries] = useState( {});
  const [flags, setFlags] = useState( []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCovidCountries();
      const summariesResult = await getSummaries();
      const flags = await getFlags();

      setCountries(result);
      setSummaries(summariesResult);
      setFlags(flags)
    };

    fetchData();
  }, []);

  const getDataForCountry = async (country) => {
    // click on country
  };

  return (
      <div className="main-container">
        <CountryList flags={flags}/>
        <World_map summaries={summaries.Countries} />
        <div className="summary-container">
          <Summary summaries={summaries.Global}/>
          <Graph />
        </div>
      </div>
  );
};

export default Root;
