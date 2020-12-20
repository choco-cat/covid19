import React from "react";
import { filters } from "../../constants/filters";

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

  const onCheckChange = (e) => {
    if (e.target.checked) {
      updateFilters({geography: ""});
    } else {
      if (dataForCountry) {
        dataForCountry("Belarus");
      }
    }
  };

  return (
    <>
      {
        options.status && (
      <div>
        <select onChange={onSelectChange} value={globalFilters.status}>
          <option value={filters.status.confirmed}>Confirmed</option>
          <option value={filters.status.deaths}>Deaths</option>
          <option value={filters.status.recovered}>Recovered</option>
        </select>
      </div>
        )
      }
      {
        options.relative && (
          <div>
            <input
              type="radio"
              name="relative"
              value={filters.relative.absolute}
              checked={globalFilters.relative === filters.relative.absolute ? 'selected' : ''}
              onChange={onRadioChangeRelative}/>
            <label htmlFor="dewey">Absolute count</label>
            <input
              type="radio"
              name="relative"
              value={filters.relative.to100men}
              onChange={onRadioChangeRelative}
              checked={globalFilters.relative === filters.relative.to100men ? 'selected' : ''}
            />
            <label htmlFor="dewey">Per 100k</label>
          </div>
        )
      }
      {
        options.period && (
      <div>
        <input
          type="radio"
          name="period"
          value={filters.period.all}
          checked={globalFilters.period === filters.period.all ? 'selected' : ''}
          onChange={onRadioChangePeriod}/>
        <label htmlFor="dewey">All time</label>
        <input
          type="radio"
          name="period"
          value={filters.period.lastDay}
          onChange={onRadioChangePeriod}
          checked={globalFilters.period === filters.period.lastDay ? 'selected' : ''}
        />
        <label htmlFor="dewey">Last Day</label>
      </div>
        )
      }
      {
        options.word && (
      <div>
        <input
          type="checkbox"
          name="geography"
          value=""
          onChange={onCheckChange}
          checked={globalFilters.geography === ''}
        />
        <label htmlFor="geography">World</label>
      </div>
        )
      }
    </>
  );
};

export default Filters;