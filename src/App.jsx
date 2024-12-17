import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import CurrenciesPage from './CurrenciesPage';
import CryptoPage from './CryptoPage';
import CurrencyConverter from './CurrencyConverter';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/currenciespage" component={CurrenciesPage}/>
          <Route path="/cryptopage" component={CryptoPage}/>
          <Route path="/currencyconverter" component={CurrencyConverter}/>
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;