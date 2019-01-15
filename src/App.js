import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state ={
      username: '',
      activeUser: false,
      loginForm: false,
      userInfo: undefined
    }
  }

  setLoginForm(){
    this.setState({ 
      loginForm: !this.state.loginForm
     });
  }

  handleChange(event) {
    console.log('$$###$$$$$$$$$$$$$',event.target.value);
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/user/${this.state.username}`)
    .then( response => response.json() )
    .then( data => {
      console.log(data);
      this.setState({
        userInfo: data
      })
    })
    .catch( error => {
      console.log('App.js handleSubmit function: ', error);
      alert("register plz");
    })

    console.log(this.state.userInfo);
  }

  handleSaveJob() {
    if(this.state.userInfo === undefined) {
      alert("Plase Login or Register")
    } else {
      
    }
  }

  //This function will render the log-in form it the login is true
  renderLoginForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Username: </label>
          <input type="text" placeholder="Enter username" onChange={this.handleChange.bind(this)}/>
          <button>Login</button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="">
        <div className="">
          <p className="cursor" >Register</p>
          <p className="cursor" onClick={() => this.setLoginForm()}>Login</p>
        </div>
        {this.state.loginForm ? this.renderLoginForm() : ''}

        <h1>Search For Job</h1>
        <Search userInfo={this.state.userInfo}/>
      </div>
    );
  }
}

export default App;
