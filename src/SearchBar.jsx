import React, { Component } from "react";
import SearchFilter from "./SearchFilter";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { filterValue: "kanji" };
  }

  handleFilterChange(filterType) {
    this.setState({ filterValue: filterType });
  }

  render() {
    return (
      <div className="h-100">
        <form className="h-100" autoComplete="off">
          <div className="input-group mx-auto">
            <SearchFilter onFilterChange={this.handleFilterChange.bind(this)} />
            <div className="filter-badge-wrapper">
              <span className="filter-badge text-center">
                <strong>{this.state.filterValue}</strong>
              </span>
            </div>
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
