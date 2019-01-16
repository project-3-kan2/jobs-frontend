import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import UserForm from './components/UserForm'

const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      activeUser: false,
      loginForm: false,
      userInfo: undefined,
      results: [],
      userForm: false
    }
  }

  setLoginForm() {
    this.setState({
      loginForm: !this.state.loginForm,
      userForm: false
    });
  }

  handleChange(event) {
    console.log('$$###$$$$$$$$$$$$$', event.target.value);
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`${API_URL}user/${this.state.username}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          userInfo: data
        })
      })
      .catch(error => {
        console.log('App.js handleSubmit function: ', error);
        alert("register plz");
      })

    console.log(this.state.userInfo);
  }

  handleSaveJob(job) {
    if (this.state.userInfo === undefined) {
      alert("Plase Login or Register to save and apply to job")
    } else {
      this.insertSavedJob(job)
      // const index = this.state.results.indexOf(job); 
      // console.log("index",index);
      // // const {results} = this.state; 
      // // results.slice(index, 1); 
      // // console.log('## RRR', results.slice(index, 1))
      // const updatedResult = this.state.results.filter((el, i) => i !== index )
      // this.setState({ results: updatedResult })

    }
  }

  //function to insert the saved job in the javed_job database table
  insertSavedJob(savedJob) {
    console.log('$$###################', savedJob)

    const url = `${API_URL}job/`
    savedJob.user_id = this.state.userInfo.id

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(savedJob)
    })
      .then(response => response.json())
      .then(data => {
        console.log('DATA')
        console.log(data);
        const index = this.state.results.indexOf(savedJob);
        console.log("index", index);
        // const {results} = this.state; 
        // results.slice(index, 1); 
        // console.log('## RRR', results.slice(index, 1))
        const updatedResult = this.state.results.filter((el, i) => i !== index)
        this.setState({ results: updatedResult })
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateUserInfo(user) {
    const url = `${API_URL}/user/${user.id}`

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ userInfo: data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  createNewUser(user) {
    const url = `${API_URL}/user`;
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ userInfo: data })
      })
  }

  handleFormSubmit(user) {
    this.state.activeUser ? this.updateUserInfo(user) : this.createNewUser(user)
  }

  //This function will render the log-in form it the login is true
  renderLoginForm() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Username: </label>
          <input type="text" placeholder="Enter username" onChange={this.handleChange.bind(this)} />
          <button>Login</button>
        </form>
      </div>
    )
  }

  handleResults(dataResult) {
    this.setState({
      results: dataResult
    })
    console.log("results %%%%%", this.state.results)
  }

  handleRegister() {
    this.setState({
      userForm: !this.state.userForm,
      loginForm: false
    });
  }

  renderUserForm() {
    return <UserForm activeUser={this.state.activeUser} handleFormSubmit={this.handleFormSubmit.bind(this)} handleRegister={this.handleRegister.bind(this)} />
  }

  render() {
    return (
      <div className="">
        <div className="">
          <p className="cursor" onClick={() => this.handleRegister()}>Register</p>
          <p className="cursor" onClick={() => this.setLoginForm()}>Login</p>
        </div>
        {this.state.loginForm ? this.renderLoginForm() : ''}
        {this.state.userForm ? this.renderUserForm() : ''}
        <h1>Search For Job</h1>
        <Search handleSaveJob={this.handleSaveJob.bind(this)} handleResults={this.handleResults.bind(this)} results={this.state.results} userInfo={this.state.userInfo} />
      </div>
    );
  }
}

export default App;
