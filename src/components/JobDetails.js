import React from "react";

const JobDetails = props => {
  return (
    <div>
      {/* <div
        className="back"
        onClick={() => {
          props.setCurrentJob(null);
        }}
      >
        back
      </div> */}

      <div className="job-details">
        <div>
        <img src={props.job.company_logo} />
          <h2>{props.job.title}</h2>
          <h4>Company: {props.job.company}</h4>
          <h4>Location: {props.job.location}</h4>
          <p>Discreption: {props.job.discreption}</p>  
        </div>
        <div>
          <div className="job-buttons">
          <button onClick={() => window.open({props.job.url}, "_blank")}>Apply</button>
          <button>Save</button>
            {/* <button onClick={() => { props.handelClicked() }}>Save</button>
            <button onClick={() => { props.job.url }}>apply </button> */}
          </div>
        </div>
      </div>
    </div>
  
  );
}
// handelClicked {
// if(this.props.Singed ){
//   props.toggleModal(true); /
// }
// eles {
//   props.toggleModal(null);
// }


export default JobDetails;

