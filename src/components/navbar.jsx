import React from 'react';
import { NavLink } from "react-router";


      


function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Astro kaisu</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <NavLink to="/yourchart" end className="nav-link">
                Your Chart
            </NavLink>
            <NavLink to="/interpretations"  className="nav-link">Interpretations</NavLink>
            <NavLink to="/contact"  className="nav-link">Contact</NavLink>
          </ul>
        </div>
      </nav>
    );
}

export default NavBar;
