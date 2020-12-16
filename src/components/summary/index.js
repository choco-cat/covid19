import React from 'react';
import Table from './table';

export default class Summary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: this.getBySelect()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getBySelect(value = 'total') {
    let allowed;

    if (value === 'lastDay') {
      allowed = ['NewConfirmed', 'NewDeaths', 'NewRecovered'];
    }
    else if (value === 'total') {
      allowed = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'];
    }

    return Object.keys(this.props.summaries)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.props.summaries[key];
        return obj;
      }, {});

  }

  handleChange(event) {
    this.setState({ current: this.getBySelect(event.target.value) });
  }

  render() {
    return (
      <div className="tablesWrap">
        <Table {...this.state.current} />
        <div className="summarySelectWrap">
          <select onChange={this.handleChange}>
            <option value="total">Entire period</option>
            <option value="lastDay">Last day</option>
          </select>
        </div>

      </div>
    );
  }
}
