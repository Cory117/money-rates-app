import React from "react";
import { Link } from "react-router-dom";

const CurrencyTable = ({ base, rates }) => {
  if (!rates) { return null; }
  
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-center">1.00 {base}</th>
          <th scope="col" className="text-right">Change</th>
        </tr>
      </thead>
      <tbody>
        {rates.map(currency =>
          <tr key={currency.acronym}>
            <td>
              <span 
                class={`fi fi-${currency.flagCode.toLowerCase()}`}
                style={{ marginRight: "5px" }}
              ></span>
              {currency.name} <small>({currency.acronym})</small>
            </td>
            <td className="text-center">
              <Link 
                to={`/currencyconverter?base=${base}&quote=${currency.acronym}`} 
                style={{ textDecoration: "none" }}
              >
                {currency.rate.toFixed(6)}
              </Link>
            </td>
            <td className="text-right">
              <small style={{ color: currency.change < 0 ? "red" : "#10ad15" }}>
                {currency.change}%
              </small>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}  

export default CurrencyTable;