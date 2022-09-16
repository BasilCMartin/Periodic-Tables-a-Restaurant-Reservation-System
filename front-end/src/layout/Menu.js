import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css"
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
        <div id="background-container" className="row d-flex justify-content-between side-bar">
        <Link to="/">
          <div className="col d-flex flex-wrap ">
            <span id="logo" className="font-size-xxl">Periodic Tables</span>
          </div>
        </Link>
        <nav id="nav" className="row align-items-center ">
        <ul className="col d-flex flex-wrap nav" id="accordionSidebar">
          <li className="nav-item">
            <Link className="text-light nav-link" to="/dashboard">
              <span className="" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="text-light nav-link" to="/search">
              <span className="" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="text-light nav-link" to="/reservations/new">
              <span className="" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="text-light nav-link" to="/tables/new">
              <span  />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
    </nav>
    </div>
  );
}

export default Menu;
