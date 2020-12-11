import React, { useState, useEffect } from 'react';
import { getCovidCountries, getSummaries } from '../../api/covid';
import Block1 from '../block1';
import CountryList from '../countryList';
import World_map from '../World_map';
import Graph from '../graph';

import './index.css';

const Root = () => {
  const [countries, setCountries] = useState( []);
  const [summaries, setSummaries] = useState( {});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCovidCountries();
      const summariesResult = await getSummaries();

      setCountries(result);
      setSummaries(summariesResult);
    };

    fetchData();
  }, []);

  const getDataForCountry = async (country) => {
    // click on country
  };

  return (
    <div className="main-container">
      <CountryList />
      <World_map summaries={summaries.Countries} />
      <div className="summary-container">
        <Block1 summaries={summaries.Global}/>
        <Graph />
      </div>
    </div>
  );
};

export default Root;
