
const Summary = ({ summaries = {} }) => {
  const {
    NewConfirmed = '',
    TotalConfirmed = '',
    NewDeaths = '',
    TotalDeaths = '',
    NewRecovered = '',
    TotalRecovered = ''
  }  = summaries;

  return (
    <div className='test'>
      <h4>Summary</h4>
      <div>
        NewConfirmed: {NewConfirmed}
      </div>
      <div>
        TotalConfirmed: {TotalConfirmed}
      </div>
      <div>
        NewDeaths: {NewDeaths}
      </div>
      <div>
        TotalDeaths: {TotalDeaths}
      </div>
      <div>
        NewRecovered: {NewRecovered}
      </div>
      <div>
        TotalRecovered: {TotalRecovered}
      </div>
    </div>
  );
};

export default Summary;
