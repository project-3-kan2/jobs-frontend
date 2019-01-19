import React from "react";

// Functional componenrt will render the selectedJob in this format 
const JobDetails = props => {
  return (
    <div>
      <div className="cursor" onClick={() => { props.setSelectedJob(null) }}>back</div>
      <div className="media">
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              <h2>{props.selectedJob.title}</h2>
              <h4>Company: {props.selectedJob.company_name}</h4>
              <h4>Location: {props.selectedJob.job_location}</h4>
              <p>Description: {props.selectedJob.description}</p>
            </div>
            <div className="col-sm image">
              <img src={props.selectedJob.company_logo} alt={props.selectedJob.company_name} />
            </div>
            {props.userInfo === undefined ? '' :
              <button className="btn btn-secondary btn-lg " onClick={() => window.open(`${props.selectedJob.job_url}`, "_blank")}>Apply</button>
            }
            <button className="btn btn-secondary btn-lg " onClick={() => props.handleSaveJob(props.selectedJob)}>Save</button>
          </div>
        </div>
        </div>
        </div>

        );
      }
      
export default JobDetails;