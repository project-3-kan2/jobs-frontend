import React from 'react';

const SearchResult = (props) => {    
    return(
        <div className="search-resualt">
            <div onClick={() => props.setSelectedJob(props.job)}>
                <h2>{props.job.title}</h2>
                <p>Company: {props.job.company}</p>
                <p>Location: {props.job.location}</p>
                <img src={props.job.company_logo} alt={props.job.company} className="company-logo"/>
                <button>Save Job</button>
                {/* <button onClick={() => {props.(props.saved_job)}}></button> */}
            </div>  
        </div>
    )
}


export default SearchResult;