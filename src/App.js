import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import UserForm from './components/UserForm';
import UserProfile from './components/UserProfile';
import SearchResult from './components/SearchResult';
import JobDetails from './components/JobDetails';
import swal from '../node_modules/sweetalert';

const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loginForm: false,
      userInfo: undefined,
      results: [],
      userForm: false,
      showProfile: false,
      userSavedJob: [],
      searchTerm: '',
      selectedJob: null
    }
  }

  setSearchTerm(term) {
    this.setState({
      searchTerm: term
    })
  }

  setSelectedJob(job) {
    this.setState({
      selectedJob: job
  })
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
        this.setState({
          userInfo: data,
          loginForm: false
        })
      })
      .catch(error => {
        console.log('App.js handleSubmit function: ', error);
        swal({
          title: "This username NOT Registered",
          icon: "warning"
        });
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
    })
    .catch(error => {
      console.log('App.js handleUserSavedJob function: ', error);
      swal("register plz");
    })
  }

  removeSavedJob(userSavedJobId) {

    const url = `${API_URL}job/${userSavedJobId}`

    fetch(url, {
      method: 'DELETE'
    })
    .then(response => response.json())
      .then(data => {
        const updatedUserSavedJob = this.state.userSavedJob.filter( savedJob => savedJob.id !== userSavedJobId )
        this.setState({
          userSavedJob: updatedUserSavedJob,
          selectedJob: null
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleSaveJob(job) {
    if (this.state.userInfo === undefined) {
      swal({
        title: "Plase Login or Register to save and apply to job",
        icon: "warning"
      });
    } else {
      this.insertSavedJob(job)
    }
  }

  renderSavedJob() {
    if(this.state.selectedJob === null) {
      return this.state.userSavedJob.map((job, index) => {
        return <SearchResult key={index}
                             job={job}
                             showProfile={this.state.showProfile} 
                             handleSaveJob={this.handleSaveJob} 
                             removeSavedJob={this.removeSavedJob.bind(this)}
                             setSelectedJob={this.setSelectedJob.bind(this)}
                             />
      })
    } else {
      return <JobDetails userInfo={this.state.userInfo} 
                         selectedJob={this.state.selectedJob} 
                         handleSaveJob={this.handleSaveJob.bind(this)}
                         />
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
        const index = this.state.results.indexOf(savedJob);
        const updatedResult = this.state.results.filter((el, i) => i !== index)
        this.setState({ 
          results: updatedResult,
          selectedJob: null
         })
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleFormSubmit(user) {
    this.state.userInfo ? this.updateUserInfo(user) : this.createNewUser(user)
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
        this.setState({ 
          userInfo: data,
          userForm: false 
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  createNewUser(user) {
    const url = `${API_URL}user`

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
      .catch(error => {
        console.log('createNewUser Error: ', error)
        swal("Tnis username or email is Registerd.");
      })
  }

  //This function will render the log-in form it the login is true
  renderLoginForm() {
    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
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
    return <UserForm userInfo={this.state.userInfo} 
                     handleFormSubmit={this.handleFormSubmit.bind(this)} 
                     handleRegister={this.handleRegister.bind(this)} 
                     />
  }

  renderUserProfile(){
    return <UserProfile user={this.state.userInfo} 
                        handleRegister={this.handleRegister.bind(this)} 
                        renderSavedJob={this.renderSavedJob.bind(this)}
                        setUserProfile={this.setUserProfile.bind(this)}
                        />
  }

  handleLogout() {
    this.setState({
      username: '',
      userInfo: undefined,
      results: [],
      showProfile: false,
      userForm: false,
      searchTerm: '',
      selectedJob: null
    })
  }

  setUserProfile() {
    this.setState({ showProfile: !this.state.showProfile})
    this.handleUserSavedJob(this.state.userInfo);
  }

  renderNavButton() {
    if(this.state.userInfo) {
      return(<div>
        <p className="cursor-username" onClick={() => this.setUserProfile()}>{this.state.userInfo.username}</p>
        <p className="cursor-logout" onClick={() => this.handleLogout()}>Logout</p>
      </div>
      )
    } else {
      return( <div className="d-inline-flex p-2  nav-info"> 
          <p>Already have an account?</p>
          <p onClick={() => this.handleRegister()}>Register</p>
          <span>or</span>
          <p onClick={() => this.setLoginForm()}>Login</p>
      </div>)
    }
  }

  render() {
    return (
      <div className="app">
          <nav className="navbar navbar-light ">
              <img className="d-inline-block align-top"  width="200" height="250" src="https://slack-imgs.com/?c=1&url=https%3A%2F%2Fi.imgur.com%2F0ZaePDc.jpg" alt="" />
              {this.renderNavButton()}
          </nav>
        {this.state.loginForm ? this.renderLoginForm() : ''}
        {this.state.userForm ? this.renderUserForm() : ''}
        {this.state.showProfile ? this.renderUserProfile() : 
                                  <Search handleSaveJob={this.handleSaveJob.bind(this)} 
                                          handleResults={this.handleResults.bind(this)} 
                                          results={this.state.results} 
                                          userInfo={this.state.userInfo}
                                          showProfile={this.state.showProfile}
                                          setSearchTerm={this.setSearchTerm.bind(this)}
                                          searchTerm={this.state.searchTerm}
                                          setSelectedJob={this.setSelectedJob.bind(this)}
                                          renderSavedJob={this.renderSavedJob.bind(this)}
                                          selectedJob={this.state.selectedJob}
                                           /> }
      </div>
    );
  }
}

export default App;