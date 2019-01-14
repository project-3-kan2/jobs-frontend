import React from 'react';

const SearchResult = (props) => {
    return(
        <div className="search-resualt">
        
            <h2>{props.job.title}</h2>
            <p>Company{props.job.company}</p>
            <p>Location: {props.job.location}</p>
            <img src={props.job.company_logo} alt="C"/>
            <button>Save Job</button>
        {/* <button onClick={() => {props.(props.saved_job)}}></button> */}
        </div>

    )
}


export default SearchResult;