import React, { Component } from "react";
import PropTypes from "prop-types";
import AutoCompleteListItem from "./AutoCompleteListItem";

class AutoCompleteList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    kanjiList: PropTypes.array.isRequired,
  };

  render() {
    const kanjiList = this.props.kanjiList.map((kanji) => (
      <AutoCompleteListItem
        key={kanji.kanji}
        kanjiValue={kanji.kanji}
        meaningValue={kanji.kmeaning}
        kunyomiValue={kanji.kunyomi_ja}
        onyomiValue={kanji.onyomi_ja}
      />
    ));
    kanjiList.splice(10, kanjiList.length);

    return <div className="autocomplete-list">{kanjiList}</div>;
  }
}

export default AutoCompleteList;
