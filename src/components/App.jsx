import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import HomeCenterText from "./HomeCenterText";
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
        <NavigationBar />
        <HomeCenterText />
        <SearchBar />
      </div>
    );
  }
}

export default App;
