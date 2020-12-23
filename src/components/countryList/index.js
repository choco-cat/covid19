import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Draggable from 'react-draggable';
import { missedFlags, missedPopulations } from '../../constants/missed';
import { sortByParameter } from '../../services/sorting';
import { getSelectFilters, getSortedBy } from "../../services/selectFilters";
import { getFilterName } from "../../services/calculations";
import {ReactComponent as ToggleSize} from "../../icons/small.svg";
import {ReactComponent as Expand} from "../../icons/expand.svg";
import Filters from "../filters";

const sortParameters = {
    'total cases': 'TotalConfirmed',
    'new cases': 'NewConfirmed',
    'total deaths': 'TotalDeaths',
    'new deaths': 'NewDeaths',
    'total recovered': 'TotalRecovered',
    'new recovered': 'NewRecovered',
    'total cases per 100k': 'TotalConfirmedPerPopulation',
    'new cases per 100k': 'NewConfirmedPerPopulation',
    'total deaths per 100k': 'TotalDeathsPerPopulation',
    'new deaths per 100k': 'NewDeathsPerPopulation',
    'total recovered per 100k': 'TotalRecoveredPerPopulation',
    'new recovered per 100k': 'NewRecoveredPerPopulation',
};

const defaultPosition = {x: 0, y: 0};

class CountryList extends React.Component {
    constructor() {
        super();

        this.state = {
            sortedBy: 'total cases',
            globalFilters: {},
            filterText: '',
            expanded: false,
            fullSize: true,
        };

        this.listRef = React.createRef();
        this.tbodyRef = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            sortedBy: 'total cases',
            globalFilters: this.props.globalFilters,
            filterText: '',
            expanded: false,
            fullSize: true,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const scrollToActive = () => {
            const { status, period, relative } = this.props.globalFilters;
            const sortedByObj = getSortedBy(status, period, relative);

            const data = this.props.summaries.map(country => {
                return {
                    ...country,
                    TotalConfirmedPerPopulation: ((country.TotalConfirmed * 100000) / country.population),
                    NewConfirmedPerPopulation: ((country.NewConfirmed * 100000) / country.population),
                    TotalDeathsPerPopulation: ((country.TotalDeaths * 100000) / country.population),
                    NewDeathsPerPopulation: ((country.NewDeaths * 100000) / country.population),
                    TotalRecoveredPerPopulation: ((country.TotalRecovered * 100000) / country.population),
                    NewRecoveredPerPopulation: ((country.NewRecovered * 100000) / country.population),
                }
            })
            const countryIdx = sortByParameter(data, sortParameters[sortedByObj.sortedBy]).findIndex(el => el['Country'] === this.props.globalFilters.geography);
            if (countryIdx && this.tbodyRef.current.children[countryIdx]) {

                this.tbodyRef.current.children[countryIdx].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }

        if ((this.props.globalFilters !== this.state.globalFilters) && this.props !== prevProps) {
            const { status, period, relative, geography } = this.props.globalFilters;
            const sortedByObj = getSortedBy(status, period, relative);
            this.setState({ sortedBy: sortedByObj.sortedBy, status, period, relative });

            if (geography) {
                scrollToActive()
            }
        }

        if (this.props.globalFilters.geography !== this.state.geography && this.props.globalFilters.geography) {
            this.setState({geography: this.props.globalFilters.geography});
        }
    }

    makeList(data = []) {
        const { sortedBy } = this.state;

        const userLang = navigator.language;

        return sortByParameter(data, sortParameters[sortedBy]).map((item, index) => {
            const { Country, flag } = item;
            const { geography } = this.props.globalFilters;
            let amount = item[sortParameters[sortedBy]];
            amount = new Intl.NumberFormat(userLang, { minimumFractionDigits: 0, maximumFractionDigits: 2}).format(amount);

            return (
                <tr className={`country-list-item ${geography === Country ? 'country-list-item_selected' : ''}`} key={index} onClick={() => this.onCountryClick(Country)}>
                    <td><img className="country-list-item-flag" loading="lazy" src={flag} alt="flag"/></td>
                    <td><span className="country-list-item-country">{Country} </span></td>
                    <td>{amount}</td>
                </tr>
            )
        })
    }

    onInputChange = (e) => {
        this.setState({filterText: e.target.value});
    };

    onCountryClick = (Country) => {
        this.setState({geography: Country});
        this.props.handleClickOnCountry(Country);
    };

    handleToggleExpanded() {
        this.setState({ expanded: !this.state.expanded });
    };

    handleToggSize() {
        this.setState({ fullSize: !this.state.fullSize });
    };

    render() {
        const { summaries = [], flags = [] } = this.props;
        const { filterText } = this.state;

        let data = summaries.map((country) => {
            const [geography] = flags.filter(item => item.name === country.Country);
            const population = geography ? geography.population : missedPopulations[country.Country];

            return {
                ...country,
                flag: geography ? geography.flag : missedFlags[country.Country],
                population,
                TotalConfirmedPerPopulation: ((country.TotalConfirmed * 100000) / population),
                NewConfirmedPerPopulation: ((country.NewConfirmed * 100000) / population),
                TotalDeathsPerPopulation: ((country.TotalDeaths * 100000) / population),
                NewDeathsPerPopulation: ((country.NewDeaths * 100000) / population),
                TotalRecoveredPerPopulation: ((country.TotalRecovered * 100000) / population),
                NewRecoveredPerPopulation: ((country.NewRecovered * 100000) / population),
            }
        });


        if (filterText !== '') {
            data = data.filter(el => el['Country'].toLowerCase().includes(filterText.toLowerCase()))
        }

        let listItems = this.makeList(data);

        const options = {'status': true, 'relative': true, 'period': true};

        return (
          <Draggable position={this.state.expanded ? defaultPosition : null} onMouseDown={this.props.handleOnMouseUp}>
              <div
                ref={this.containerRef}
                className={`country-list-container ${this.state.expanded ? 'expanded' : ''} ${!this.state.fullSize ? 'min-size' : ''}`}
              >
                  <div className="controls">
                      <div className="title">Countries</div>
                      <ToggleSize className="controls-icons" onClick={() =>this.handleToggSize()} style={{display: !this.state.expanded ? 'inline-block' : 'none'}} />
                      <Expand className="controls-icons" onClick={() => this.handleToggleExpanded()} style={{display: this.state.fullSize ? 'inline-block' : 'none'}} />
                  </div>
                  {
                      this.state.fullSize ? (
                        <div className="block-inner">
                            <div className="border-stroke">
                                <div className="filters">
                                    <Filters globalFilters={this.props.globalFilters} updateFilters={this.props.updateFilters} options={options}/>
                                </div>
                            <input onChange={this.onInputChange} placeholder="Search..." type="text" id="searсh" />
                            </div>
                            <div ref={this.listRef} className="country-list">

                                <Scrollbars style={{width: 'auto', height: '60vh'}}>
                                    <table>
                                        <tbody ref={this.tbodyRef}>
                                    {listItems}
                                        </tbody>
                                    </table>
                                </Scrollbars>

                            </div>
                        </div>
                      ) : null
                  }
              </div>
          </Draggable>
        );
    }
}

export default CountryList;
