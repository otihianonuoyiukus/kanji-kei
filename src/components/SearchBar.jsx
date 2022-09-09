import "./App.css";
import React, { Component } from "react";
import Papa from "papaparse";
import SearchFilter from "./SearchFilter";
import AutoCompleteList from "./AutoCompleteList";
import RadicalTable from "./RadicalTable";

//TODO: Might want to make this "better"
let resultKanji;
const csvURLKanji =
  "https://raw.githubusercontent.com/kanjialive/kanji-data-media/master/language-data/ka_data.csv";
Papa.parse(csvURLKanji, {
  download: true,
  worker: true,
  header: true,
  complete: function (data) {
    resultKanji = data.data;
  },
});

let resultRadical;
const csvURLRadical =
  "https://raw.githubusercontent.com/kanjialive/kanji-data-media/master/language-data/japanese-radicals.csv";
Papa.parse(csvURLRadical, {
  download: true,
  worker: true,
  header: true,
  complete: function (data) {
    resultRadical = data.data;
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "meaning",
      searchValue: "",
      kanjiList: [],
      selectedRadicalChar: "",
      highlightedRadicalStrokeGrp: -1,
    };
  }

  handleFilterChange(filterType) {
    this.setState({
      filterValue: filterType,
      searchValue: "",
      selectedRadicalChar: "",
      highlightedRadicalStrokeGrp: -1,
    });
  }

  handleSearchChange(event) {
    let searchValue = event.target.value;
    let searchResult,
      closeMatch = [],
      closestMatch = [];

    if (searchValue.length > 0) {
      switch (this.state.filterValue) {
        case "meaning":
          searchResult = resultKanji.filter((kanji) =>
            kanji.kmeaning.includes(searchValue)
          );

          for (let i = searchResult.length - 1; i >= 0; i--) {
            const kanji = searchResult[i];
            const kanjiMeaning = kanji.kmeaning.split(", ");
            let isClosest = false,
              isClose = false;

            kanjiMeaning.forEach((meaning) => {
              if (
                meaning.substring(0, searchValue.length).toLowerCase() ==
                searchValue.toLowerCase()
              ) {
                isClose = true;
                if (meaning.length == searchValue.length) {
                  isClosest = true;
                }
              }
            });
            if (isClosest == true) {
              isClose = false;
              closestMatch.unshift(kanji);
              searchResult.splice(i, 1);
            } else if (isClose == true) {
              closeMatch.unshift(kanji);
              searchResult.splice(i, 1);
            }
          }
          closestMatch.forEach((kanji) => closeMatch.push(kanji));
          closeMatch.sort((a, b) => b.kmeaning.length - a.kmeaning.length);
          closeMatch.forEach((kanji) => searchResult.unshift(kanji));
          break;
        case "radical":
          break;
        default:
          searchResult = resultKanji.filter((kanji) =>
            kanji.kanji.includes(searchValue)
          );
      }
    }

    this.setState({
      searchValue: searchValue,
      kanjiList: searchResult,
    });
  }

  handleRadicalSelect(radicalChar) {
    const searchValue = radicalChar;
    const stateRadicalChar = this.state.selectedRadicalChar;

    if (stateRadicalChar == radicalChar) {
      this.setState({
        searchValue: "",
        selectedRadicalChar: "",
      });
    } else {
      this.setState({
        searchValue: searchValue,
        selectedRadicalChar: radicalChar,
      });
    }

    const searchResult = resultKanji.filter((kanji) =>
      kanji.radical.includes(searchValue.trim())
    );

    this.setState({
      kanjiList: searchResult,
    });
  }

  handleRadicalHighlight(strokeNum) {
    this.setState({ highlightedRadicalStrokeGrp: strokeNum });
  }

  render() {
    //TODO: Use the spread thing for the state properties
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
              type="text"
              className="form-control"
              placeholder="Search"
              value={this.state.searchValue}
              onChange={this.handleSearchChange.bind(this)}
              disabled={this.state.filterValue == "radical"}
            />
          </div>
        </form>
        {this.state.filterValue === "radical" && (
          <RadicalTable
            resultRadical={resultRadical}
            selectedRadicalChar={this.state.selectedRadicalChar}
            highlightedRadicalStrokeGrp={this.state.highlightedRadicalStrokeGrp}
            onRadicalSelect={this.handleRadicalSelect.bind(this)}
            onRadicalHighlight={this.handleRadicalHighlight.bind(this)}
          />
        )}
        {this.state.searchValue.length > 0 &&
          this.state.kanjiList.length > 0 && (
            <AutoCompleteList
              filterValue={this.state.filterValue}
              kanjiList={this.state.kanjiList}
            />
          )}
      </div>
    );
  }
}

export default SearchBar;
