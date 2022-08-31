import React, { Component } from "react";
import PropTypes from "prop-types";

StrokeNumberSquare.propTypes = {
  strokeNum: PropTypes.number.isRequired,
  onRadicalHighlight: PropTypes.func.isRequired,
};

function StrokeNumberSquare(props) {
  const strokeNum = props.strokeNum;

  return (
    <li
      className="square stroke-square"
      onMouseEnter={() => props.onRadicalHighlight(strokeNum)}
      onMouseLeave={() => props.onRadicalHighlight(-1)}
    >
      {strokeNum}
    </li>
  );
}

RadicalSquare.propTypes = {
  radical: PropTypes.object.isRequired,
  selectedRadicalChar: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  onRadicalSelect: PropTypes.func.isRequired,
};

function RadicalSquare(props) {
  const {
    radical,
    selectedRadicalChar,
    isSelected,
    isHighlighted,
    onRadicalSelect,
  } = props;

  let listClassName =
    isSelected == true
      ? "square radical-square activated selected"
      : selectedRadicalChar == ""
      ? "square radical-square activated"
      : "square radical-square deactivated";

  listClassName = isHighlighted
    ? `${listClassName} highlighted`
    : listClassName;

  return (
    <li
      className={listClassName}
      onClick={() => onRadicalSelect(radical.Radical)}
    >
      {radical.Radical}
    </li>
  );
}

class RadicalTable extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    resultRadical: PropTypes.array.isRequired,
    onRadicalSelect: PropTypes.func.isRequired,
    onRadicalHighlight: PropTypes.func.isRequired,
    selectedRadicalChar: PropTypes.string.isRequired,
    highlightedRadicalStrokeGrp: PropTypes.number.isRequired,
  };

  handleRadicalSelect(radicalChar) {
    this.props.onRadicalSelect(radicalChar);
  }

  handleRadicalHighlight(strokeNum) {
    this.props.onRadicalHighlight(strokeNum);
  }

  render() {
    const selectedRadicalChar = this.props.selectedRadicalChar;
    const highlightedRadicalStrokeGrp = this.props.highlightedRadicalStrokeGrp;
    const radicalList = this.props.resultRadical;
    const radicalCompList = radicalList
      .map((radical) => (
        <RadicalSquare
          key={radical["Radical ID#"]}
          radical={radical}
          selectedRadicalChar={selectedRadicalChar}
          isSelected={selectedRadicalChar == radical.Radical}
          isHighlighted={
            parseInt(radical["Stroke#"]) === highlightedRadicalStrokeGrp
          }
          onRadicalSelect={this.handleRadicalSelect.bind(this)}
        />
      ))
      .splice(0, radicalList.length - 1);

    for (let i = radicalList.length - 2; i >= 0; i--) {
      if (i == 0) {
        radicalCompList.unshift(
          <StrokeNumberSquare
            key={i + radicalList.length}
            strokeNum={parseInt(radicalList[i]["Stroke#"])}
            onRadicalHighlight={this.handleRadicalHighlight.bind(this)}
          />
        );
      } else if (
        parseInt(radicalList[i - 1]["Stroke#"]) <
          parseInt(radicalList[i]["Stroke#"]) &&
        i > 0
      ) {
        radicalCompList.splice(
          i,
          0,
          <StrokeNumberSquare
            key={i + radicalList.length}
            strokeNum={parseInt(radicalList[i]["Stroke#"])}
            onRadicalHighlight={this.handleRadicalHighlight.bind(this)}
          />
        );
      }
    }

    return <ul className="radical-table clearfix">{radicalCompList}</ul>;
  }
}

export default RadicalTable;
