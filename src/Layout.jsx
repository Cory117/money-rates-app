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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themeIcon = theme === "light" 
  ? <i class="bi bi-sun-fill"></i> 
  : <i class="bi bi-moon-stars-fill"></i>

  return (
    <React.Fragment>
      <nav className={`navbar navbar-${theme} bg-${theme}`}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="navbar-brand mx-2 h1">Money Rates</span>
        </Link>
          <button 
            onClick={toggleTheme}
            class={"btn btn-sm mx-2"} 
            style={{ color: theme === "light" ? "black" : "white", border: "none" }}
          >
            {themeIcon}
          </button>
      </nav>
      <div className="container py-3" data-bs-theme={theme}>
        {children}
      </div>
      <footer className={`bg-${theme} text-center`}>
        <div className="container pt-3">
          <section className="mb-3">
            <a
              className={`btn btn-lg text-${theme === "dark" ? "light" : "dark"} m-1`}
              href="https://github.com/Cory117"
              target="_blank"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              className={`btn btn-lg text-${theme === "dark" ? "light" : "dark"} m-1`}
              href="https://www.linkedin.com/in/cory-daddona-6237a3158/"
              target="_blank"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </section>
        </div>
        <div 
          className={`text-center text-${theme === "dark" ? "light" : "dark"} p-3`}
          style={{ backgroundColor: "rgba(0, 0, 0, .1)" }}
        >
          © 2024 Cory Daddona. All rights reserved.
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;