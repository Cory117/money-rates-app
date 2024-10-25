import React, { useState, useEffect } from "react";
import currencies from "./Currencies";
import CurrencyTable from "./CurrencyTable";
import { json, checkStatus } from "./utils";

const Home = () => {
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRatesData(base);
  }, [base]);

  const changeBase = (event) => {
    setBase(event.target.value);
  };

  const getRatesData = (base) => {
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?base=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const ratesData = Object.keys(data.rates)
          .filter(acronym => acronym !== base)
          .map(acronym => ({
            acronym,
            rate: data.rates[acronym],
            name: currencies[acronym].name,
            symbol: currencies[acronym].symbol,
            flagCode: acronym.slice(0,2),
          }));

        setRates(ratesData);
        setLoading(false);
      })
      .catch(error => console.error(error.message));
  };

  return (
    <React.Fragment>
      <form className="p-3 form-inline justify-content-center">
        <h4 className="mb-2">Base currency: <b className="mr-2">1</b></h4>
        <select value={base} onChange={changeBase} className="form-control mb-2" disabled={loading}>
          {Object.keys(currencies).map(currencyAcronym => (
            <option key={currencyAcronym} value={currencyAcronym}>
              {currencyAcronym}
            </option>
          ))}
        </select>
      </form>
      <CurrencyTable base={base} rates={rates} />
    </React.Fragment>
  );
};

export default Home;