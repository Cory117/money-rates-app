import React from "react";
import { Link } from "react-router-dom";

const Layout = (props) => {
  return (
    <React.Fragment>
      <div className="px-2 mt-2">
        <Link to="/"><h3 id="title">Money Rates</h3></Link>
      </div>
      <hr/>
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