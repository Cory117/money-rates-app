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
      <footer className="p-5 bg-light text-center">
        <div className="mb-2">
          <span className="mr-3">Built by Cory Daddona. Check out my <a href="https://github.com/Cory117">GitHub</a> and <a href="https://www.linkedin.com/in/cory-daddona-6237a3158/">LinkedIn</a></span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;