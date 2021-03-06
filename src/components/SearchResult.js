import React from 'react';

//This functional component will render the result state in this format
const SearchResult = (props) => {

    return (
        <div className="media">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm">
                        <h5 className="cursor" onClick={() => props.setSelectedJob(props.job)}>{props.job.title} </h5>
                        <p className="card-text"> {props.job.company_name}</p>
                        <p className="mt-0"> Company name : {props.job.company_name}</p>
                        <p className="mb-0"> company location :{props.job.job_location}</p>
                    </div>
                    <div className="col-sm image">
                        <img src={props.job.company_logo} alt={props.job.company_name} />
                    </div>

                    {props.showProfile ? <button className="btn btn-secondary btn-lg" onClick={() => props.removeSavedJob(props.job.id)}>Remove</button> :'' }
                    {props.showProfile ? <button className="btn btn-secondary btn-lg" onClick={() => window.open(`${props.job.job_url}`, "_blank")}>Apply</button> :
                             <button className="btn btn-secondary btn-lg " onClick={() => props.handleSaveJob(props.job)}>Save Job</button>}
                </div>
            </div>
        </div>
    )
}

export default SearchResult;