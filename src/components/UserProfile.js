import React from 'react';

// where are the props coming from ?
// whats the name of the fucntion passing the props 
const UserProfile = (props) => {
    return(
        <div className="profile">
            <div onClick={() => props.SHOWUER(props.user)}>
            <p>{props.SHOWUER.firstname}{props.SHOWUER.lastname}</p>
            <p>Your log in email is:{props.SHOWUER.email}</p>
            <p>phone: {props.SHOWUER.phone}</p>
            </div>
        </div>
    )
}

export default UserProfile;