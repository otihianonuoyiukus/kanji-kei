import React, { Component } from "react";
import PropTypes from "prop-types";
import AutoCompleteListItem from "./AutoCompleteListItem";

class AutoCompleteList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    filterValue: PropTypes.string.isRequired,
    kanjiList: PropTypes.array.isRequired,
  };

  render() {
    const kanjiList = this.props.kanjiList.map((kanji) => (
      <AutoCompleteListItem key={kanji.kanji} kanji={kanji} />
    ));
    this.props.filterValue === "radical"
      ? null
      : kanjiList.splice(10, kanjiList.length);

    return <div className="autocomplete-list">{kanjiList}</div>;
  }
}

export default AutoCompleteList;
