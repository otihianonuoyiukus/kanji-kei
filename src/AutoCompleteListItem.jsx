import React, { Component } from "react";
import PropTypes from "prop-types";

class AutoCompleteListItem extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    kanjiValue: PropTypes.string.isRequired,
    meaningValue: PropTypes.string.isRequired,
    kunyomiValue: PropTypes.string.isRequired,
    onyomiValue: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="autocomplete-item">
        <span
          className="autocomplete-item-kanji"
          onClick={() => console.log(this.props.meaningValue)} //TODO: Might want to remove this later.
        >
          {this.props.kanjiValue}
        </span>
        <span className="autocomplete-item-reading">
          {this.props.kunyomiValue}
        </span>
        <span className="autocomplete-item-reading">
          {this.props.onyomiValue}
        </span>
      </div>
    );
  }
}

export default AutoCompleteListItem;
