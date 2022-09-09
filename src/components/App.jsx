import React, { Component } from "react";
import SearchBar from "./SearchBar";
import "./App.css";

class App extends Component {
  constructor() {
    super();
  }

  state = {};

  render() {
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
