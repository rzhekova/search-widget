import React, { Component } from "react";
import "./App.css";
import SearchWidget from "./components/SearchWidget";

class App extends Component {
  render() {
    return (
      <div className="App search-field">
        <SearchWidget />
      </div>
    );
  }
}

export default App;
