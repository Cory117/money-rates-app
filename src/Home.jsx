import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Money Rates</h1>
          <p className="lead mt-2">
            Your one-stop solution to track foreign exchange rates and cryptocurrency prices in real-time.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h1 className="text-center mb-5">Features</h1>
          <div className="row text-center">
            <div className="col-md-3">
              <h4>Real-Time FX Rates</h4>
              <p>Stay updated with accurate and real-time foreign exchange rates for all major currencies.</p>
            </div>
            <div className="col-md-3">
              <h4>Cryptocurrency Tracking</h4>
              <p>Monitor the latest prices and trends for top cryptocurrencies like Bitcoin, Ethereum, and more.</p>
            </div>
            <div className="col-md-3">
              <h4>Intuitive Design</h4>
              <p>Enjoy a sleek, user-friendly interface designed to make tracking rates effortless.</p>
            </div>
            <div className="col-md-3">
              <h4>Currency Flip</h4>
              <p>Easily compare and flip currencies to get the rates you need, instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2>Start Tracking Now!</h2>
          <p className="lead">Stay up-to-date and never miss a rate change.</p>
          <a 
            href="/currenciespage" 
            className="btn btn-lg btn-link mt-3" 
            style={{ textDecoration: "none" }}
          >
            Currencies
          </a>
          <a 
            href="/cryptopage" 
            className="btn btn-lg btn-link mt-3"
            style={{ textDecoration: "none" }}
          >
            Cryptocurrencies
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;