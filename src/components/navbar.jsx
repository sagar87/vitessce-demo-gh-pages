/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">BNHL-dataset</a>
      <button onClick={props.onToggle} className="btn btn-primary">
        Toggle table
      </button>
    </nav>
  );
};

export default NavBar;
