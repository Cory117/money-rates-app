import React, { useState, useEffect } from "react";
import currencies from "./Currencies";
import CurrencyTable from "./CurrencyTable";

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

  const getRatesData = async (base) => {
    try {
      setLoading(true);
  
      // Fetch today's rates
      const todayResponse = await fetch(`https://api.frankfurter.app/latest?base=${base}`);
      const todayData = await todayResponse.json();
  
      // Fetch yesterday's rates
      const yesterday = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const yesterdayResponse = await fetch(`https://api.frankfurter.app/${yesterday}?base=${base}`);
      const yesterdayData = await yesterdayResponse.json();

      // Calculate rate changes
      const ratesData = Object.keys(todayData.rates)
        .filter(acronym => acronym !== base)
        .map(acronym => {
          const todayRate = todayData.rates[acronym];
          const yesterdayRate = yesterdayData.rates[acronym];
          const change = ((todayRate - yesterdayRate) / yesterdayRate) * 100;
  
          return {
            acronym,
            rate: todayRate,
            name: currencies[acronym]?.name,
            symbol: currencies[acronym]?.symbol,
            flagCode: acronym.slice(0, 2),
            change: change.toFixed(2),
          };
        });
  
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
  );
};

export default Home;