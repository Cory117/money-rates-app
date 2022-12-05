import React from "react";
import currencies from "./Currencies";
import CurrencyTable from "./CurrencyTable";
import { json, checkStatus } from "./utils";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      base: 'USD',
      rates: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value });
    this.getRatesData(event.target.value);
  }

  getRatesData = (base) => {
    this.setState({ loading: true });
    fetch(`https://www.frankfurter.app/latest?base=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rates = Object.keys(data.rates)
          .filter(acronym => acronym !== base)
          .map(acronym => ({
            acronym,
            rate: data.rates[acronym],
            name: currencies[acronym].name,
            symbol: currencies[acronym].symbol,
          }))

        this.setState({ rates, loading: false });
      })
      .catch(error => console.error(error.message));
  }

  render () {
    const { base, rates, loading } = this.state;

    return (
      <React.Fragment>
        <form className="p-3 form-inline justify-content-center">
          <h4 className="mb-2">Base currency: <b className="mr-2">1</b></h4>
          <select value={base} onChange={this.changeBase} className="form-control mb-2" disabled={loading}>
            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
          </select>
        </form>
        <CurrencyTable base={base} rates={rates} />
      </React.Fragment>
    )
  }
}

export default Home;