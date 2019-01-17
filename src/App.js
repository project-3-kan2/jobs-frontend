import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import UserForm from './components/UserForm';
import UserProfile from './components/UserProfile';
import SearchResult from './components/SearchResult';

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
      userForm: false,
      showProfile: false,
      userSavedJob: [],
      // searchTerm: '',
      // selectedJob: null
    }
  }

  setLoginForm() {
    this.setState({
      loginForm: !this.state.loginForm,
      userForm: false
    });
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`${API_URL}user/${this.state.username}`)
      .then(response => response.json())
      .then(data => {
        console.log('YYYYY',data);
        this.setState({
          userInfo: data,
          loginForm: false,
          activeUser:true
        })
      })
      .catch(error => {
        console.log('App.js handleSubmit function: ', error);
        alert("register plz");
      })
    console.log(this.state.userInfo);
  }

  handleUserSavedJob(user) {

    fetch(`${API_URL}job/${user.id}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        userSavedJob: data
      })
      console.log('$$$$$$$$$$$$$$$$TTTTTTTTTTTTTTT', this.state.userSavedJob)

    })
    .catch(error => {
      console.log('App.js handleUserSavedJob function: ', error);
      alert("register plz");
    })
  }

  renderSavedJob() {
    return this.state.userSavedJob.map((job, index) => {
      return <SearchResult handleSaveJob={this.handleSaveJob} key={index} job={job} showProfile={this.state.showProfile}/>
    })
  }

  handleSaveJob(job) {
    if (this.state.userInfo === undefined) {
      alert("Plase Login or Register to save and apply to job")
    } else {
      this.insertSavedJob(job)
    }
  }

  //function to insert the saved job in the javed_job database table
  insertSavedJob(savedJob) {

    const url = `${API_URL}job/`
    savedJob.user_id = this.state.userInfo.id;

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
    console.log("##", user);
    const url = `${API_URL}user/${user.id}`

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
    const url = `${API_URL}user`;
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          userInfo: data,
          userForm: false
         })
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
    console.log("%%%%%%%%%%%%%%%%%%Results", dataResult)
    this.setState({
      results: dataResult
    })
  }

  handleRegister() {
    this.setState({
      userForm: !this.state.userForm,
      loginForm: false
    });
  }

  renderUserForm() {
    return <UserForm userInfo={this.state.userInfo} handleFormSubmit={this.handleFormSubmit.bind(this)} handleRegister={this.handleRegister.bind(this)} />
  }

  renderUserProfile(){
    return <UserProfile user={this.state.userInfo} handleRegister={this.handleRegister.bind(this)} renderSavedJob={this.renderSavedJob.bind(this)}/>
  }

  handleLogout() {
    this.setState({
      username: '',
      activeUser: false,
      userInfo: undefined,
      results: [],
      userProfile: false,
      userForm: false
    })
  }

  setUserProfile() {
    this.setState({ showProfile: true})
    this.handleUserSavedJob(this.state.userInfo);
  }

  renderNavButton() {
    if(this.state.userInfo) {
      return(<div>
        <p className="cursor" onClick={() => this.setUserProfile()}>{this.state.userInfo.username}</p>
        <p className="cursor" onClick={() => this.handleLogout()}>Logout</p>
      </div>)
    } else {
      return( <div className="">
          <p className="cursor" onClick={() => this.handleRegister()}>Register</p>
          <p className="cursor" onClick={() => this.setLoginForm()}>Login</p>
      </div>)
    }
  }

  render() {
    return (
      <div className="">
        {this.renderNavButton()}
        {this.state.loginForm ? this.renderLoginForm() : ''}
        {this.state.userForm ? this.renderUserForm() : ''}
        {this.state.showProfile ? this.renderUserProfile() : 
                                  <Search handleSaveJob={this.handleSaveJob.bind(this)} 
                                          handleResults={this.handleResults.bind(this)} 
                                          results={this.state.results} 
                                          userInfo={this.state.userInfo}
                                          showProfile={this.state.showProfile} /> }
      </div>
    );
  }
}

export default App;