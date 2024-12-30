import React from "react";

const CryptoTable = ({ coins }) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th scope="col">Coin</th>
          <th scope="col">Price <small>(USD)</small></th>
          <th scope="col">24h</th>
          <th scope="col">7d</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={index}>
            <td>{coin.name} <small>({coin.symbol})</small></td>
            <td>${coin.price}</td>
            <td>
              <small 
                style={{ color: 
                  coin.change24h < 0 ? "red" 
                  : coin.change24h > 0 ? "#10ad15" 
                  : "gray" 
                }}
              >
                {coin.change24h}%
              </small>
            </td>
            <td>
              <small 
                style={{ color: 
                  coin.change7d < 0 ? "red" 
                  : coin.change7d > 0 ? "#10ad15" 
                  : "gray" 
                }}
              >
                {coin.change7d}%
              </small>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CryptoTable;