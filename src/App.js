import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state ={
      username: ''
    }
  }

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
