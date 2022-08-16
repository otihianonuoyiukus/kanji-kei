import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchFilter extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
  };

  handleFilterChange(filterType) {
    this.props.onFilterChange(filterType);
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary btn-lg dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Search by
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <p
            className="dropdown-item"
            onClick={() => this.handleFilterChange("kanji")}
          >
            Kanji
          </p>
          <p
            className="dropdown-item"
            onClick={() => this.handleFilterChange("radical")}
          >
            Radical
          </p>
          <p
            className="dropdown-item"
            onClick={() => this.handleFilterChange("meaning")}
          >
            Meaning
          </p>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
