import React from "react";

const JobDetails = props => {
  console.log('JobDetails $$$$$$$$$$$$$$$$$$$$')
  console.log(props.selectedJob)
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
        <img className="company-logo" src={props.selectedJob.company_logo} alt={props.selectedJob.company_name}/>
          <h2>{props.selectedJob.title}</h2>
          <h4>Company: {props.selectedJob.company_name}</h4>
          <h4>Location: {props.selectedJob.job_location}</h4>
          <p>Description: {props.selectedJob.description}</p>  
        </div>
        <div>
          <div className="job-buttons">
          {props.userInfo === undefined? '' :
          <button onClick={() => window.open(`${props.selectedJob.job_url}`, "_blank")}>Apply</button>}
          <button onClick={() => props.handleSaveJob(props.selectedJob)}>Save</button>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default JobDetails;

