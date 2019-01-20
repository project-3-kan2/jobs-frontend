import React from 'react';

const UserProfile = (props) => {
    return(
        <div>
          <button className="cursor" onClick={() => { props.setUserProfile() }}>back</button>
          <div className="show-profile">
              <h4 className="username">Username: {props.user.username}</h4>
              <h4 className="firstname">First Name: {props.user.firstname}</h4>
              <h4 className="lastname">Last Name: {props.user.lastname}</h4>
              <h4 className="email">Email: {props.user.email}</h4>
              <h4 className="phone">Phone: {props.user.phone}</h4>
              <button className="edit"onClick={() => props.handleRegister()}>Edit</button>
          </div>
          <div>    
              <div>
                {props.renderSavedJob()}
              </div>
          </div>
        </div>

    )
}

export default UserProfile;