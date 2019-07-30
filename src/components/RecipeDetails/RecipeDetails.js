import React, { Component } from "react";
import "./RecipeDetails.css";
import { Box, Text } from "gestalt";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { FaClock, FaHamburger } from "react-icons/fa";

class RecipeDetails extends Component {
  state = {
    app_id: "2261a5d5",
    app_key: "f2db99fca44e24a72d1263ecd87d7aa0",
    recipe: null
  };

  componentDidMount() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const recipe_q = url.searchParams.get("for");
    const recipe_id = url.searchParams.get("id");

    const api_url =
      "https://api.edamam.com/search?q=" +
      recipe_q +
      "&app_id=" +
      this.state.app_id +
      "&app_key=" +
      this.state.app_key +
      "&from=" +
      recipe_id +
      "&to=" +
      (parseInt(recipe_id) + 1);

    axios.get(api_url).then(res => {
      this.setState({ recipe: res.data.hits[0].recipe });
    });
  }

  render() {
    let title = null;
    let src = null;
    let ingredients = null;
    let totalTime = null;
    let serves = null;
    let totalNutrients = null;
    if (this.state.recipe) {
      let recipe = this.state.recipe;
      title = recipe.label;
      totalTime = recipe.totalTime;
      serves = recipe.yield;
      src = recipe.image;
      ingredients = recipe.ingredientLines;
      totalNutrients = recipe.totalNutrients;
      totalNutrients = Object.keys(totalNutrients).map(key =>
        Object.keys(totalNutrients[key]).map(key2 => totalNutrients[key][key2])
      );
    }

    return (
      <React.Fragment>
        {this.state.recipe ? (
          <React.Fragment>
            <Text align="center" bold size="xl">
              <Box paddingX={3} paddingY={2}>
                {title}
              </Box>
            </Text>

            <Text bold size="md">
              <Box paddingX={3} paddingY={2}>
                <span className="pr-2">
                  <FaClock style={{ color: "#FDB813" }} /> {totalTime} mins
                </span>{" "}
                |
                <span className="pl-3">
                  <FaHamburger style={{ color: "#FDB813" }} /> {serves} serves
                </span>
              </Box>
            </Text>
            <div className="row">
              <div className="col-12 col-sm-5 col-lg-4 pb-4">
                <img src={src} alt="recipe" />
              </div>

              <div className="col-12 col-sm-7 col-lg-8">
                <h4>{ingredients.length} Ingredients</h4>
                {ingredients ? (
                  <ul>
                    {ingredients.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                ) : null}

                <h4>{totalNutrients.length} Nutrients</h4>
                <div className="row">
                  {totalNutrients.map((nutrient, index) => (
                    <p key={index} className="col-6 col-sm-12 col-md-6">
                      <strong>{nutrient[0]}:</strong> {nutrient[1].toFixed(1)}{" "}
                      {nutrient[2]}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

export default RecipeDetails;
