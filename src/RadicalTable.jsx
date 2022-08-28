import React, { Component } from "react";
import PropTypes from "prop-types";

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
      className="radical-square activated selected"
      onClick={() => props.onRadicalSelect(radical["Radical ID#"])}
    >
      {radical.Radical}
    </li>
  ) : selectedRadical == "" ? (
    <li
      className="radical-square activated"
      onClick={() => props.onRadicalSelect(radical["Radical ID#"])}
    >
      {radical.Radical}
    </li>
  ) : (
    <li
      className="radical-square deactivated"
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
    const radicalList = this.props.resultRadical.map((radical) => (
      <RadicalSquare
        key={radical["Radical ID#"]}
        radical={radical}
        selectedRadical={selectedRadicalId}
        isSelected={selectedRadicalId == radical["Radical ID#"]}
        onRadicalSelect={this.handleRadicalSelect.bind(this)}
      />
    ));

    return <ul className="radical-table clearfix">{radicalList}</ul>;
  }
}

export default RadicalTable;
