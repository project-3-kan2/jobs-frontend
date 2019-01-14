import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="">
        <h1>Search For Job</h1>
        <Search />
      </div>
    );
  }
}

export default App;
