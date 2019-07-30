import React from "react";
import homeImage from "../../images/home-img.jpg";
import './Home.css';

const Home = () => (
  <div className="home">
    <h3>Get Ready for Your Fantastic Recipes? Go Search</h3>
    <img src={homeImage} alt="homescreen"/>
  </div>
);

export default Home;
