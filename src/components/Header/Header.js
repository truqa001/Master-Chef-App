import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { withRouter } from "react-router-dom";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = props => (
  <header>
    <Link to="/">
      <img className="logo" src={logo} alt="logo"/>
    </Link>
    <SearchBar {...props} />
  </header>
);
export default withRouter(Header);
