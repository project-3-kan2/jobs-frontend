import React from 'react';

const UserProfile = (props) => {
    return(
        <div>
          <div className="show-profile">
              <h4>Username: {props.user.username}</h4>
              <h4>First Name: {props.user.firstname}</h4>
              <h4>Last Name: {props.user.lastname}</h4>
              <h4>Email: {props.user.email}</h4>
              <h4>Phone: {props.user.phone}</h4>

             <button onClick={() => props.handleRegister()}>Edit</button>
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