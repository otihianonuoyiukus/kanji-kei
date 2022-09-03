import React, { Component } from "react";
import PropTypes from "prop-types";
import HoveredTransliterationIcon from "./assets/svg/ic_transliteration-hovered.svg";
import UnhoveredTransliterationIcon from "./assets/svg/ic_transliteration-unhovered.svg";

class AutoCompleteListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  static propTypes = {
    kanji: PropTypes.object.isRequired,
  };

  onTransliterationEnter() {
    this.setState({ isHovered: true });
  }

  onTransliterationLeave() {
    this.setState({ isHovered: false });
  }

  render() {
    const { kanji, kmeaning, kunyomi_ja, kunyomi, onyomi_ja, onyomi } =
      this.props.kanji;
    const isHovered = this.state.isHovered;

    return (
      <div className="autocomplete-item">
        <span
          className="autocomplete-item-component kanji"
          onClick={() => console.log(kmeaning)} //TODO: Might want to remove this later.
        >
          {kanji}
        </span>
        <img
          className="autocomplete-item-component icon transliteration"
          src={
            isHovered
              ? HoveredTransliterationIcon
              : UnhoveredTransliterationIcon
          }
          onMouseEnter={() => this.onTransliterationEnter()}
          onMouseLeave={() => this.onTransliterationLeave()}
        />
        <span className="autocomplete-item-component desc meaning">
          {kmeaning}
        </span>
        <span className="autocomplete-item-component desc reading">
          {isHovered ? (kunyomi != "n/a" ? kunyomi : null) : kunyomi_ja}
        </span>
        <span className="autocomplete-item-component desc reading">
          {isHovered ? (onyomi != "n/a" ? onyomi : null) : onyomi_ja}
        </span>
      </div>
    );
  }
}

export default AutoCompleteListItem;
