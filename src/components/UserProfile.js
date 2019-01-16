import React from 'react';

// where are the props coming from ?
// whats the name of the fucntion passing the props 
const UserProfile = (props) => {
    return(
        <div className="profile">
                <div>
        <h4>Username: {props.user.username}</h4>
        <h4>First Name: {props.user.firstname}</h4>
        <h4>Last Name: {props.user.lastname}</h4>
        <h4>Email: {props.user.email}</h4>
        <h4>Phone: {props.user.phone}</h4>
      </div>
      <div>
        <div className="edit">

          <button>Edit</button>

        </div>
      </div>
        </div>
    )
}

export default UserProfile;