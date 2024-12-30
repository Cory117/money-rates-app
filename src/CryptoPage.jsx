import React, { useState, useEffect } from "react";
import CryptoTable from "./CryptoTable";

const CryptoPage = () => {
  const [coins, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCoinsData();
  }, []);

  const getCoinsData = async () => {
    try {
      setLoading(true);

      const cryptoResponse = await fetch("https://api.coinlore.net/api/tickers/");
      const cryptoData = await cryptoResponse.json();

      const coinData = cryptoData.data.map(coin => {
        const coinName = coin.name;
        const coinSymbol = coin.symbol;
        const coinPrice = coin.price_usd;
        const coinChange24h = coin.percent_change_24h;
        const coinChange7d = coin.percent_change_7d;

        return {
          name: coinName,
          symbol: coinSymbol,
          price: coinPrice,
          change24h: coinChange24h,
          change7d: coinChange7d,
        };
      });

      setCoins(coinData);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : coins ? (
        <CryptoTable coins={coins} />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  )
}

export default CryptoPage;