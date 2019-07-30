import React, { Component } from "react";
import axios from "axios";
import "./Recipes.css";
import Recipe from "./Recipe/Recipe";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import Pagination from "jw-react-pagination";

class Recipes extends Component {
  state = {
    app_id: "2261a5d5",
    app_key: "f2db99fca44e24a72d1263ecd87d7aa0",
    recipes: null,
    param: "",
    pageOfItems: []
  };

  componentDidMount() {
    this.getRecipes();
  }

  componentDidUpdate(prevProps) {
    //url changed (search keywords changed)
    if (prevProps !== this.props) {
      this.setState({ recipes: null, pageOfItems:[] });
      this.getRecipes();
    }
  }
  onSearchChange = value => {
    this.setState({ searchValue: value });
  };

  onChangePage = pageOfItems => {
    this.setState({ pageOfItems: pageOfItems });
  };

  getRecipes = () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const param = url.searchParams.get("q");
    this.setState({ param: param });

    const api_url =
      "https://api.edamam.com/search?q=" +
      param +
      "&app_id=" +
      this.state.app_id +
      "&app_key=" +
      this.state.app_key +
      "&from=0" +
      "&to=100";

    axios.get(api_url).then(res => {
      this.setState({ recipes: res.data.hits });
    });
  };

  render() {
    let recipes = <Spinner />;
    if (this.state.pageOfItems) {
      recipes = this.state.pageOfItems.map((item, index) => (
        <Link
          key={index}
          className="col-12 col-sm-6 col-md-4 col-lg-3"
          to={"/recipe?for=" + this.state.param + "&id=" + index}
        >
          <Recipe src={item.recipe.image} title={item.recipe.label} />
        </Link>
      ));
    }

    return (
      <div>
        {this.state.recipes ? (
          <React.Fragment>
            <p>
              <strong>{this.state.recipes.length}</strong> Results found with "{this.state.param}"
            </p>
            <div className="pagination-container">
              <Pagination
                items={this.state.recipes}
                onChangePage={this.onChangePage.bind(this)}
                pageSize={12}
              />
            </div>

            <div className="row">{recipes}</div>

            <div className="pagination-container">
              <Pagination
                items={this.state.recipes}
                onChangePage={this.onChangePage.bind(this)}
                pageSize={12}
              />
            </div>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Recipes;
