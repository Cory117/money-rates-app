import React, { useState, useEffect } from "react";
import currencies from "./Currencies";
import CurrencyTable from "./CurrencyTable";

const CurrenciesPage = () => {
  const [base, setBase] = useState('USD');
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRatesData(base);
  }, [base]);

  const changeBase = (event) => {
    setBase(event.target.value);
  };

  const getRatesData = async (base) => {
    try {
      setLoading(true);

      const currencyResponse = await fetch(`https://api.frankfurter.app/latest?base=${base}`);
      const currencyData = await currencyResponse.json();
  
      const ratesData = Object.keys(currencyData.rates)
        .filter(acronym => acronym !== base)
        .map(acronym => ({
          acronym,
          rate: currencyData.rates[acronym],
          name: currencies[acronym]?.name,
          symbol: currencies[acronym]?.symbol,
          flagCode: acronym.slice(0, 2),
        }));
  
      setRates(ratesData);
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
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
  )
}

export default CurrenciesPage;