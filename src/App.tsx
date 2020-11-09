import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { edf } from "@test/edf";
import { abc } from "@test/abc";

function App() {
  const test = abc();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{test}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
