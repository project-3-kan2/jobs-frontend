import React from "react";

const JobDetails = props => {
  console.log('JobDetails $$$$$$$$$$$$$$$$$$$$')
  console.log(props.activeJob)
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
        <img src={props.selectedJob.company_logo} alt={props.selectedJob.company}/>
          <h2>{props.selectedJob.title}</h2>
          <h4>Company: {props.selectedJob.company}</h4>
          <h4>Location: {props.selectedJob.location}</h4>
          <p>Discreption: {props.selectedJob.discreption}</p>  
        </div>
        <div>
          <div className="job-buttons">
          <button onClick={() => window.open(`${props.selectedJob.url}`, "_blank")}>Apply</button>
          <button>Save</button>
            {/* <button onClick={() => { props.handelClicked() }}>Save</button> */}
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

