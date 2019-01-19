import React from "react";

const JobDetails = props => {
  console.log(props.selectedJob)
  console.log('UUUUUUUUU', props.userInfo)
  return (
    <div>
      {/* <divnclassName="back" onClick={() => {props.setCurrentJob(null);}}>back</div> */}
      <div className="job-details">
       
          <img src={props.selectedJob.company_logo} alt={props.selectedJob.company_name}/>
            <h2>{props.selectedJob.title}</h2>
            <h4>Company: {props.selectedJob.company_name}</h4>
            <h4>Location: {props.selectedJob.job_location}</h4>
            <p>Description: {props.selectedJob.description}</p>  
          
            { props.userInfo === undefined? '' :
              <button onClick={() => window.open(`${props.selectedJob.job_url}`, "_blank")}>Apply</button>
            }
            <button onClick={() => props.handleSaveJob(props.selectedJob)}>Save</button>
         
        </div>
      </div>
   
  );
}

export default JobDetails;