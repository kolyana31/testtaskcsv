import logo from './logo.svg';
import React from "react";
import './App.css';

import { CSVTable } from "./components/csvReader";

function App() {

  return (
    <div className="App">
      <CSVTable/>
    </div>
  );
}

export default App;
