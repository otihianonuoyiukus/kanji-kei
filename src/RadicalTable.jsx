import React, { Component } from "react";
import PropTypes from "prop-types";

StrokeNumberSquare.propTypes = {
  strokeNum: PropTypes.number.isRequired,
};

function StrokeNumberSquare(props) {
  const strokeNum = props.strokeNum;

  return <li className="square stroke-square">{strokeNum}</li>;
}

RadicalSquare.propTypes = {
  radical: PropTypes.object.isRequired,
  selectedRadical: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRadicalSelect: PropTypes.func.isRequired,
};

function RadicalSquare(props) {
  const radical = props.radical;
  const selectedRadical = props.selectedRadical;

  return props.isSelected ? (
    <li
      className="square radical-square activated selected"
      onClick={() => props.onRadicalSelect(radical["Radical ID#"])}
    >
      {radical.Radical}
    </li>
  ) : selectedRadical == "" ? (
    <li
      className="square radical-square activated"
      onClick={() => props.onRadicalSelect(radical["Radical ID#"])}
    >
      {radical.Radical}
    </li>
  ) : (
    <li
      className="square radical-square deactivated"
      onClick={() => props.onRadicalSelect(radical["Radical ID#"])}
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
    selectedRadicalId: PropTypes.string.isRequired,
  };

  handleRadicalSelect(radicalId) {
    this.props.onRadicalSelect(radicalId);
  }

  render() {
    const selectedRadicalId = this.props.selectedRadicalId;
    const radicalList = this.props.resultRadical;
    const radicalCompList = radicalList
      .map((radical) => (
        <RadicalSquare
          key={radical["Radical ID#"]}
          radical={radical}
          selectedRadical={selectedRadicalId}
          isSelected={selectedRadicalId == radical["Radical ID#"]}
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
          />
        );
      }
    }

    return <ul className="radical-table clearfix">{radicalCompList}</ul>;
  }
}

export default RadicalTable;
