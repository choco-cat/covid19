import React, { useState, useEffect } from 'react';
import country from 'world-map-country-shapes';
import Tooltip from './tooltip';
import Legend from './legend';
import { getColorsFromFilters } from '../../../services/calculations';

import './index.scss';

const Map = ({ summaries = [], handleClickOnCountry, globalFilters, updateFilters }) => {

  const [selectedCountries, setSelectedCountries] = useState({});
  const [customStyles, setStyle] = useState({ display: 'none' });
  const [dataCountry, setDataCountry] = useState({});
  const [scaleIndex, setScaleIndex] = useState(1);
  const [legend, updateLegend] = useState([]);
  const [diffCoeff, updateDiffCoeff] = useState([]);
  const [mapPositionX, setMapPositionX] = useState(0);
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);

  const [mapPositionY, setMapPositionY] = useState(0);
  const [isDragStart, setDragStart] = useState(0);
  const [summariesAfterCalculation, updateSummaries] = useState([]);
  const zoomIndex = 0.25;
  const maxZoom = 8;

  const showCountry = (e, country, covidDataForCountry) => {
    setSelectedCountries({
      [country.id]: !selectedCountries[country.id]
    });

    setStyle({
      display: "block",
      left: e.pageX + 1 + 'px',
      top: e.pageY + 1 + 'px',
    });

    setDataCountry(covidDataForCountry);
  };

  const hideCountry = (country) => {
    setStyle({
      display: "none"
    });

    setSelectedCountries({
      [country.id]: !selectedCountries[country.id]
    });
  };

  const getFormatedCoefficient = (coefficient) => {
    let formattedCoefficiend = parseFloat(coefficient.toFixed(1));
    if (formattedCoefficiend > 1) formattedCoefficiend = 1;
    if (isNaN(formattedCoefficiend)) formattedCoefficiend = 0.1;
    if (formattedCoefficiend < 0.1) formattedCoefficiend = 0.1;

    return formattedCoefficiend;
  };

  useEffect(() => {
    const listOfCoef = new Set();
    const temp = summaries.sort((el1, el2) => el1.Data > el2.Data ? 1 : -1);
    const diffCoeff = (temp[temp.length-1].Data - temp[0].Data) * 0.8;
    const summariesWithCoef = summaries.map(summaryForCountry => {
      const coefficient = (summaryForCountry.Data - temp[0].Data) / diffCoeff;
      listOfCoef.add(getFormatedCoefficient(coefficient));
      return {
        ...summaryForCountry,
        coefficient: getFormatedCoefficient(coefficient)
      }
    });
    updateSummaries(summariesWithCoef);
    updateLegend([...listOfCoef]);
    updateDiffCoeff(diffCoeff);
  }, [summaries]);

  const getColorForCountry = (countryID, covidDataForCountry) => {
    if (covidDataForCountry.Country === globalFilters.geography) {
       return 'green';
    }

    if (selectedCountries[countryID]) {
      return "#fde5bc";
    }
    return `rgba(${getColorsFromFilters(globalFilters.status)},${covidDataForCountry.coefficient || 0.2})`;
  };

  const mapCountries = country.map(country => {
    const covidDataForCountry = summariesAfterCalculation.find(summaryForCountry => summaryForCountry.CountryCode === country.id) || {};

    return (
      <path
        key={country.id}
        d={country.shape}
        style={{
          fill: getColorForCountry(country.id, covidDataForCountry),
          cursor: "pointer",
          stroke: "#555"
        }}
        onMouseOver={(evt) => showCountry(evt, country, covidDataForCountry)}
        onMouseOut={() => hideCountry(country)}
        onClick={() => handleClickOnCountry(covidDataForCountry.Country)}
      >
      </path>
    )
  });

  const scaleMap = (newScaleParam) => {
    if (newScaleParam > zoomIndex && newScaleParam < maxZoom) {
      setScaleIndex(newScaleParam);
    }
  };

  const handleMouseWeel = (e) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      scaleMap(scaleIndex + zoomIndex);
    } else {
      scaleMap(scaleIndex - zoomIndex);
    }
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setDragStart(true);
    setMapPositionX(e.pageX - diffX);
    setMapPositionY(e.pageY - diffY);
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    setDragStart(false);
  };

  const handleMouseMove = (e) => {
    e.stopPropagation();
    if (isDragStart) {
      setDiffX((e.pageX - mapPositionX) / scaleIndex);
      setDiffY((e.pageY - mapPositionY) / scaleIndex);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => scaleMap(scaleIndex - zoomIndex)}
          disabled={scaleIndex === 2 * zoomIndex}
          className='map-button'
        >
          <span>-</span>
        </button>
        <button
          onClick={() => scaleMap(scaleIndex + zoomIndex)}
          disabled={scaleIndex === maxZoom - zoomIndex}
          className='map-button'
        >
          <span>+</span>
        </button>
      </div>

      <Tooltip customStyles={customStyles} dataCountry={dataCountry} globalFilters={globalFilters}/>

      <div className='map-container' onWheel={handleMouseWeel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="500"
            width="700"
            viewBox="0 0 2000 1001"
            style={{transform: `scale(${scaleIndex}) translate(${diffX}px, ${diffY}px`}}
            className="map"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {mapCountries}
          </svg>
      </div>

      <Legend data={legend} diffCoeff={diffCoeff} globalFilters={globalFilters} updateFilters={updateFilters}/>
    </>
  )
};


export default React.memo(Map);
