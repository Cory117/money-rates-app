import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import currencies from "./Currencies";
import { json, checkStatus } from "./utils";
import { useLocation } from "react-router-dom";

const CurrencyConverter = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [rate, setRate] = useState(0);
  const [baseAcronym, setBaseAcronym] = useState(params.get('base') || 'USD');
  const [baseValue, setBaseValue] = useState(0);
  const [quoteAcronym, setQuoteAcronym] = useState(params.get('quote') || 'JPY');
  const [quoteValue, setQuoteValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    getRate(baseAcronym, quoteAcronym);
    getHistoricalRates(baseAcronym, quoteAcronym);
  }, [baseAcronym, quoteAcronym]);

  const getRate = (base, quote) => {
    setLoading(true);
    fetch(`https://api.frankfurter.app/latest?base=${base}&symbols=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        } 

        const newRate = data.rates[quote];
        setRate(newRate);
        setBaseValue(1);
        setQuoteValue(Number((1 * newRate).toFixed(3)));
        setLoading(false);
      })
      .catch(error => console.error(error.message));
  };

  const getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        buildChart(chartLabels, chartData, `${base}/${quote}`);
      })
      .catch(error => console.error(error.message));
  };

  const buildChart = (labels, data, label) => {
    const chartContext = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartContext, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  };

  const toBase = (amount, rate) => amount * (1 / rate);
  const toQuote = (amount, rate) => amount * rate;

  const convert = (amount, rate, equation) => {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) { return ''; }
    return equation(input, rate).toFixed(3);
  };

  const changeBaseAcronym = (event) => {
    setBaseAcronym(event.target.value);
  };

  const changeBaseValue = (event) => {
    const newQuoteValue = convert(event.target.value, rate, toQuote);
    setBaseValue(event.target.value);
    setQuoteValue(newQuoteValue);
  };

  const changeQuoteAcronym = (event) => {
    setQuoteAcronym(event.target.value);
  };

  const changeQuoteValue = (event) => {
    const newBaseValue = convert(event.target.value, rate, toBase);
    setQuoteValue(event.target.value);
    setBaseValue(newBaseValue);
  };

  const currencyOptions = Object.keys(currencies).map((currencyAcronym) => (
    <option key={currencyAcronym} value={currencyAcronym}>
      {currencyAcronym}
    </option>
  ));

  return (
    <React.Fragment>
      <div className="text-center p-3 mb-2">
        <h2 className="mb-2">Currency Converter</h2>
        <h4>
          1 {baseAcronym} to 1 {quoteAcronym} = {rate.toFixed(4)} {currencies[quoteAcronym].name}
        </h4>
      </div>
      <form className="form-row p-3 mb-4 d-flex justify-content-center align-items-center">
        <div className="form-group col-md-5 mb-0">
          <select
            value={baseAcronym}
            onChange={changeBaseAcronym}
            className="form-control mb-2"
            disabled={loading}
          >
            {currencyOptions}
          </select>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">{currencies[baseAcronym].symbol}</div>
            </div>
            <input
              id="base"
              className="form-control"
              value={baseValue}
              onChange={changeBaseValue}
              type="number"
            />
          </div>
          <small className="text-secondary">{currencies[baseAcronym].name}</small>
        </div>
        <div className="col-md-2 py-3 mb-3 d-flex justify-content-center align-items-center">
          <h3>=</h3>
        </div>
        <div className="form-group col-md-5 mb-0">
          <select
            value={quoteAcronym}
            onChange={changeQuoteAcronym}
            className="form-control mb-2"
            disabled={loading}
          >
            {currencyOptions}
          </select>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">{currencies[quoteAcronym].symbol}</div>
            </div>
            <input
              id="quote"
              className="form-control"
              value={quoteValue}
              onChange={changeQuoteValue}
              type="number"
            />
          </div>
          <small className="text-secondary">{currencies[quoteAcronym].name}</small>
        </div>
      </form>
      <canvas ref={chartRef} />
    </React.Fragment>
  );
};

export default CurrencyConverter;