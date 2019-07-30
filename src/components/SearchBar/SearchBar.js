import React, { Component } from "react";
import { SearchField } from "gestalt";
import './SearchBar.css';

class SearchBar extends Component {
  state = {
    searchValue: ""
  };

  componentDidMount() {
    //initialize value with search parameters if has any
    this.setSearchValue();

    //add searchbar on enter pressed event
    let searchField = document.querySelector("#searchField");
    searchField.onkeydown = ele => {
      if (ele.key === "Enter" && this.state.searchValue !== "") {
        this.props.history.push("/search?q=" + this.state.searchValue);
      }
    };
  }

  componentDidUpdate (prevProps) {
    if (prevProps !== this.props) {
      this.setSearchValue();
    }
  }

  onSearchChange = value => {
    this.setState({ searchValue: value });
  };

  setSearchValue = () => {
    const url_string = window.location.href;
    if (url_string.includes("/search")) {
      const url = new URL(url_string);
      const param = url.searchParams.get("q");
      this.setState({ searchValue: param });
    }else {
      this.setState({searchValue: ""});
    }
  }

  render() {
    return (
      <div className="pl-5 pr-5 pb-5 search-bar-container">
        <SearchField
          accessibilityLabel="Search Field"
          id="searchField"
          onChange={({ value }) => this.onSearchChange(value)}
          placeholder="Search your Recipes"
          value={this.state.searchValue}
        />
      </div>
    );
  }
}

export default SearchBar;
