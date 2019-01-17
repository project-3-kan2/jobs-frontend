import React from 'react';

const SearchResult = (props) => {  
    //onClick={() =>  }
    return(
        <div className="search-resualt">
            <div>
            {props.showProfile === true ? <p >X</p> : ''}
                <h2 className="job-info" onClick={() => props.setSelectedJob(props.job)}>{props.job.title}</h2>
                <p>Company: {props.job.company_name}</p>
                <p>Location: {props.job.job_location}</p>
                <img src={props.job.company_logo} alt={props.job.company_name} className="company-logo"/>
                <button onClick={() => props.handleSaveJob(props.job)}>Save Job</button>
                {props.showProfile ? <button onClick={() => window.open(`${props.job.job_url}`, "_blank")}>Apply</button> : ''}
            </div>  
        </div>
    )
}

export default SearchResult;