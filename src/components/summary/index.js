import React from 'react';
import Draggable from 'react-draggable';
import Table from './table';

export default class Summary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: this.getBySelect()
    };
    this.handleChange = this.handleChange.bind(this);
    this.getBySelect = this.getBySelect.bind(this);
  }

  getBySelect(value = 'total') {
    
    const allowedNew = ['NewConfirmed', 'NewDeaths', 'NewRecovered'];
    const alloweTotal = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'];

    let allowed;

    if (value === 'lastDay') {
      allowed = allowedNew;
    } else if (value === 'total') {
      allowed = alloweTotal;
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
      <Draggable>
        <div className="tablesWrap">
          <Table {...this.state.current} />
          <div className="summarySelectWrap">
            <select onChange={this.handleChange}>
              <option value="total">Entire period</option>
              <option value="lastDay">Last day</option>
            </select>
          </div>
        </div>
      </Draggable>
    );
  }
}
