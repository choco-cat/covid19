import React from "react";
import { filters } from "../../constants/filters";
import {getFilterName} from "../../services/calculations";

const Filters = ({ globalFilters, updateFilters, dataForCountry, options }) => {
  const onSelectChange = (e) => {
    updateFilters({status: e.target.value});
  };

  const onRadioChangeRelative = (e) => {
    updateFilters({relative: e.target.value});
  };

  const onRadioChangePeriod = (e) => {
    updateFilters({period: e.target.value});
  };

  return (
    <>
      {
        options.status && (
      <div className="filer-select">
        <select onChange={onSelectChange} value={globalFilters.status}>
          <option value={filters.status.confirmed}>{getFilterName(filters.status.confirmed)}</option>
          <option value={filters.status.deaths}>{getFilterName(filters.status.deaths)}</option>
          <option value={filters.status.recovered}>{getFilterName(filters.status.recovered)}</option>
        </select>
      </div>
        )
      }
      {
        options.relative && (
          <div>
            <div>
            <input
              type="radio"
              value={filters.relative.absolute}
              checked={globalFilters.relative === filters.relative.absolute ? 'selected' : ''}
              onChange={onRadioChangeRelative}/>
            <label htmlFor="dewey">{getFilterName(filters.relative.absolute)}</label>
            </div>
            <div>
            <input
              type="radio"
              value={filters.relative.to100men}
              onChange={onRadioChangeRelative}
              checked={globalFilters.relative === filters.relative.to100men ? 'selected' : ''}
            />
            <label htmlFor="dewey">{getFilterName(filters.relative.to100men)}</label>
            </div>
          </div>
        )
      }
      {
        options.period && (
      <div>
      <div>
        <input
          type="radio"
          value={filters.period.all}
          checked={globalFilters.period === filters.period.all ? 'selected' : ''}
          onChange={onRadioChangePeriod}/>
        <label htmlFor="dewey">{getFilterName(filters.period.all)}</label>
        </div>
        <div>
        <input
          type="radio"
          value={filters.period.lastDay}
          onChange={onRadioChangePeriod}
          checked={globalFilters.period === filters.period.lastDay ? 'selected' : ''}
        />
        <label htmlFor="dewey">{getFilterName(filters.period.lastDay)}</label>
      </div>
      </div>
        )
      }
    </>
  );
};

export default Filters;