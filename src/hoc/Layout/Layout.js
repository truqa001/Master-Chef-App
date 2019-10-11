import React from "react";
import './Layout.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = props => (
  <React.Fragment>
    <Header />
    <div className="container">{props.children}</div>
  </React.Fragment>
);

export default Layout;
