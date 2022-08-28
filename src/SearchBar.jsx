import React, { Component } from "react";
import Papa from "papaparse";
import SearchFilter from "./SearchFilter";
import AutoCompleteList from "./AutoCompleteList";
import RadicalTable from "./RadicalTable";

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
      selectedRadicalId: "",
    };
  }

  handleFilterChange(filterType) {
    this.setState({
      filterValue: filterType,
      searchValue: "",
      selectedRadicalId: "",
    });
  }

  handleSearchChange(event) {
    const searchValue = event.target.value;
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
          //TODO: Work on this.
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

  handleRadicalSelect(radicalId) {
    let stateRadicalId = this.state.selectedRadicalId;
    stateRadicalId == radicalId
      ? this.setState({ selectedRadicalId: "" })
      : this.setState({ selectedRadicalId: radicalId });
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
              value={this.state.searchValue}
              onChange={this.handleSearchChange.bind(this)}
            />
            <input
              id="searchBtn"
              type="submit"
              className="btn btn-primary btn-lg fw-bold"
              value="Search"
            />
          </div>
        </form>
        {this.state.searchValue.length > 0 && (
          <AutoCompleteList kanjiList={this.state.kanjiList} />
        )}
        {this.state.filterValue === "radical" && (
          <RadicalTable
            resultRadical={resultRadical}
            selectedRadicalId={this.state.selectedRadicalId}
            onRadicalSelect={this.handleRadicalSelect.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default SearchBar;
