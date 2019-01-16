import React from 'react';

const SearchResult = (props) => {  
    return(
        <div className="search-resualt">
            <div>
                <h2 className="job-info" onClick={() => props.setSelectedJob(props.job)}>{props.job.title}</h2>
                <p>Company: {props.job.company_name}</p>
                <p>Location: {props.job.job_location}</p>
                <img src={props.job.company_logo} alt={props.job.company_name} className="company-logo"/>
                <button onClick={() => props.handleSaveJob(props.job)}>Save Job</button>
            </div>  
        </div>
    )
}

export default SearchResult;