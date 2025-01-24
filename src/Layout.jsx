import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const initialTheme = localStorage.getItem("theme");
    return initialTheme ? initialTheme : "light";
  });

  function getThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    getThemeFromLocalStorage();
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const themeIcon = theme === "light" 
  ? <i class="bi bi-sun-fill"></i> 
  : <i class="bi bi-moon-stars-fill"></i>

  const oppTheme = theme === "dark" ? "light" : "dark"

  const buttonStyles = {
    color: theme === "light" ? "black" : "white",
    border: "none",
    background: "none"
  }

  return (
    <React.Fragment>
      <nav class={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
        <div class="container-fluid">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navbar-brand h1">Money Rates</span>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link" href="/">Home</a>
              <a class="nav-link" href="/currenciespage">Currencies</a>
              <a class="nav-link" href="/cryptopage">Cryptocurrencies</a>
              <a class="nav-link" href="/currencyconverter">Currency Converter</a>
            </div>
            <hr />
            <div class="navbar-nav ms-auto">
              <div>
                <a
                  className="btn btn-md"
                  href="https://github.com/Cory117"
                  target="_blank"
                  style={buttonStyles}
                >
                  <i className="bi bi-github"></i>
                  <span class="d-lg-none ms-2">GitHub</span>
                </a>
              </div>
              <div>
                <a
                  className="btn btn-md"
                  href="https://www.linkedin.com/in/cory-daddona-6237a3158/"
                  target="_blank"
                  style={buttonStyles}
                >
                  <i className="bi bi-linkedin"></i>
                  <span class="d-lg-none ms-2">LinkedIn</span>
                </a>
              </div>
              <div className="themeButton">
                <button 
                  class="btn btn-md"
                  onClick={toggleTheme}
                  style={buttonStyles}
                >
                  {themeIcon}
                  <span class="d-lg-none ms-2">Toggle Theme</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container py-3" data-bs-theme={theme}>
        {children}
      </div>
      <footer className={`bg-${theme} text-center mt-3`}>
        <div className="container pt-3">
          <section className="mb-3">
            <a href="#" style={buttonStyles}>
              <i class="bi bi-arrow-up-circle fs-5"></i>
            </a>
          </section>
        </div>
        <div 
          className={`text-${oppTheme} p-3`}
          style={{ backgroundColor: "rgba(0, 0, 0, .1)" }}
        >
          © 2024 Cory Daddona. All rights reserved.
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;