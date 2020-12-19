import React from 'react';
import Draggable from 'react-draggable';
import Table from './table';
import { ReactComponent as ToggleSize } from "../../icons/small.svg";
import { ReactComponent as Expand } from "../../icons/expand.svg";

const defaultPosition = {x: 0, y: 0};

export default class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.getBySelect(),
      expanded: false,
      fullSize: true,
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

  handleToggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  };

  handleToggSize() {
    this.setState({ fullSize: !this.state.fullSize });
  };

  render() {
    return (
      <Draggable  position={this.state.expanded ? defaultPosition : null}>
        <div className={`summary-wrapper ${this.state.expanded ? 'expanded' : ''}`}>
          <div className="controls">
            <div className="title">Summary</div>
            <ToggleSize className="controls-icons" onClick={() =>this.handleToggSize()} style={{display: !this.state.expanded ? 'inline-block' : 'none'}} />
            <Expand className="controls-icons" onClick={() => this.handleToggleExpanded()} style={{display: this.state.fullSize ? 'inline-block' : 'none'}} />
          </div>
          {
            this.state.fullSize ? (
              <div className="tablesWrap">
                <Table {...this.state.current} />
                <div className="summarySelectWrap">
                  <select onChange={this.handleChange}>
                    <option value="total">Entire period</option>
                    <option value="lastDay">Last day</option>
                  </select>
                </div>
              </div>
            ) : null
          }
        </div>
      </Draggable>
    );
  }
}
