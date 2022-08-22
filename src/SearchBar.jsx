import React, { Component } from "react";
import Papa from "papaparse";
import SearchFilter from "./SearchFilter";
import AutoCompleteList from "./AutoCompleteList";

let result;
const csvURL =
  "https://raw.githubusercontent.com/kanjialive/kanji-data-media/master/language-data/ka_data.csv";
Papa.parse(csvURL, {
  download: true,
  worker: true,
  header: true,
  complete: function (data) {
    result = data.data;
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "meaning",
      searchValue: "",
      kanjiList: {},
    };
  }

  handleFilterChange(filterType) {
    this.setState({ filterValue: filterType, searchValue: "" });
  }

  handleSearchChange(event) {
    const searchValue = event.target.value;
    let searchResult,
      closeMatch = [],
      closestMatch = [];

    if (searchValue.length > 0) {
      switch (this.state.filterValue) {
        case "meaning":
          searchResult = result.filter((kanji) =>
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

          // searchResult.forEach((kanji, index) => {
          //   const kanjiMeaning = kanji.kmeaning.split(", ");
          //   let isClosest = false,
          //     isClose = false;
          //   // console.log(`Kanji: ${kanji.kanji}
          //   // Kanji meaning: ${kanji.kmeaning}
          //   // isClose: ${isClose}`);
          //   kanjiMeaning.forEach((meaning) => {
          //     if (
          //       meaning.substring(0, searchValue.length).toLowerCase() ==
          //       searchValue.toLowerCase()
          //     ) {
          //       isClose = true;
          //       if (meaning.length == searchValue.length) {
          //         isClosest = true;
          //       }
          //     }
          //   });
          //   //FIXME: Find another way to splice elements out of the search results
          //   if (isClosest == true) {
          //     isClose = false;
          //     closestMatch.unshift(kanji);
          //     // searchResult.splice(index, 1);
          //   } else if (isClose == true) {
          //     closeMatch.unshift(kanji);
          //     searchResult.splice(index, 1);
          //   }
          // });
          console.log(closeMatch);
          closestMatch.forEach((kanji) => closeMatch.push(kanji));
          closeMatch.sort((a, b) => b.kmeaning.length - a.kmeaning.length);
          // console.log(closeMatch);
          closeMatch.forEach((kanji) => searchResult.unshift(kanji));
          break;
        case "radical":
          //TODO: Work on this.
          break;
        default:
          searchResult = result.filter((kanji) =>
            kanji.kanji.includes(searchValue)
          );
      }
    }

    this.setState({
      searchValue: searchValue,
      kanjiList: searchResult,
    });
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
      </div>
    );
  }
}

export default SearchBar;
