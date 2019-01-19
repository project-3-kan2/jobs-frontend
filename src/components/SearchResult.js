import React from 'react';

//This functional component will render the result state in this format
const SearchResult = (props) => {  
    
    return(
        <div className="res-cont" >
        <div className="job-result">
            { props.showProfile ? <p className="cursor" onClick={() => props.removeSavedJob(props.job.id)}>X</p> : '' }
            <h2 className="job-info" onClick={() => props.setSelectedJob(props.job)}>{props.job.title}</h2>
            <p className="job-title"> {props.job.company_name}</p>
            <p className="job-location"> {props.job.job_location}</p>
            <img className="company-logo" src={props.job.company_logo} alt={props.job.company_name} />
            { props.showProfile ? <button onClick={() => window.open(`${props.job.job_url}`, "_blank")}>Apply</button> :
                                 <button className="savebutton" onClick={() => props.handleSaveJob(props.job)}>Save Job</button>
                                 }
        </div>  
    </div>
    )
}

export default SearchResult;