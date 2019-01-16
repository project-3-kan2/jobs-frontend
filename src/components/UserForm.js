import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.activeShow ? props.activeShow.username : '',
      firstname: props.activeShow ? props.activeShow.firstname : '',
      lastname: props.activeShow ? props.activeShow.lastname : '',
      email: props.activeShow ? props.activeShow.email : '',
      phone: props.activeShow ? props.activeShow.phone : '',
      id: props.activeShow ? props.activeShow.id : null
    }
  }
  handleChange(event) {
    const currentInput = event.target.name;
    const newValue = event.target.value;
    console.log('current input: ', currentInput);
    console.log('newValue: ', newValue);

    this.setState({
      [currentInput]: newValue
    }, function () {
      console.log(this.state);
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state)
  }

  render() {
    return (
      <div className="modal">
        <form className="show-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="close-modal" onClick={() => { this.props.toggleModal() }}>x</div>
          <label>username:</label><input type="text" value={this.state.username} name="username" onChange={this.handleChange.bind(this)} /><br />
          <label>firstname:</label><input type="text" value={this.state.firstname} name="firstname" onChange={this.handleChange.bind(this)} /><br />
          <label>lastname:</label><input type="text" value={this.state.lastname} name="lastname" onChange={this.handleChange.bind(this)} /><br />
          <label>email:</label><input type="number" value={this.state.email} name="email" onChange={this.handleChange.bind(this)} /><br />
          <label>phone:</label><input type="number" value={this.state.phone} name="phone" onChange={this.handleChange.bind(this)} /><br />
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default UserForm;
