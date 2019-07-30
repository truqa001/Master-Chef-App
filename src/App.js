import React, { Component } from "react";
import "./App.css";
import Home from './components/Home/Home';
import Recipes from "./components/Recipes/Recipes";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
        <Route path="/" exact render={props => <Home />} />
          <Route path="/search" render={props => <Recipes {...props} />} />
          <Route path="/recipe" render={() => <RecipeDetails />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
