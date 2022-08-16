import React, { Component } from "react";
import SearchFilter from "./SearchFilter";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { filterValue: "kanji" };
  }

  handleFilterChange(filterType) {
    console.log(filterType);
  }

  render() {
    return (
      <div className="lead">
        <form autoComplete="off">
          <div className="input-group w-50 mx-auto">
            <SearchFilter onFilterChange={this.handleFilterChange} />
            <input
              id="searchBar"
              type="text"
              className="form-control"
              placeholder="Search"
            />
            <input
              id="searchBtn"
              type="submit"
              className="btn btn-primary btn-lg fw-bold"
              value="Search"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
