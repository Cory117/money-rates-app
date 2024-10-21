import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="navbar-brand mb-0 mx-2 h1">Money Rates</span>
        </Link>
      </nav>
      <div className="container py-3">
        {props.children}
      </div>
      <footer className="bg-light text-center">
        <div className="container pt-3">
          <section className="mb-3">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://github.com/Cory117"
              target="_blank"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.linkedin.com/in/cory-daddona-6237a3158/"
              target="_blank"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </section>
        </div>
        <div className="text-center text-dark p-3" style={{ backgroundColor: "#f1f1f1" }}>
          © 2024 Cory Daddona. All rights reserved.
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;