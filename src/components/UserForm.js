import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userInfo ? props.userInfo.username : '',
      firstname: props.userInfo ? props.userInfo.firstname : '',
      lastname: props.userInfo ? props.userInfo.lastname : '',
      email: props.userInfo ? props.userInfo.email : '',
      phone: props.userInfo ? props.userInfo.phone : '',
      id: props.userInfo ? props.userInfo.id : null
    }
  }

  handleChange(event) {
    const currentInput = event.target.name;
    const newValue = event.target.value;

    this.setState({
      [currentInput]: newValue
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleFormSubmit(this.state)
  }

  render() {
    return (
      <div className="">
        <form className="user-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="close-modal" onClick={() => this.props.handleRegister()}>x</div>
          <label>username:</label><input type="text" value={this.state.username} name="username" onChange={this.handleChange.bind(this)} /><br />
          <label>firstname:</label><input type="text" value={this.state.firstname} name="firstname" onChange={this.handleChange.bind(this)} /><br />
          <label>lastname:</label><input type="text" value={this.state.lastname} name="lastname" onChange={this.handleChange.bind(this)} /><br />
          <label>email:</label><input type="text" value={this.state.email} name="email" onChange={this.handleChange.bind(this)} /><br />
          <label>phone:</label><input type="text" value={this.state.phone} name="phone" onChange={this.handleChange.bind(this)} /><br />
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default UserForm;