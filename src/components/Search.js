import React , { Component } from 'react';
import SearchResult from './SearchResult';
import JobDetails from './JobDetails';
// var ip = require('ip');

class Search extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         // searchTerm: '',
    //         selectedJob: null
    //     }
    // }


    handleChange(event) {
        const userInput = event.target.value;
        // const updateSearchTerm = userInput.split(' ').join('-');
        // this.setState({
        //     searchTerm: event.target.value,
        // })
        this.props.setSearchTerm(userInput)
    }

    handleSumbit(event) {
        event.preventDefault();
        // this.setState({
        //     selectedJob: null
        // })
        this.props.setSelectedJob.bind(null);

        const LookupIP = 'https://ipapi.co/json/';
        const url1 = `https://jobs.github.com/positions.json?description=${this.props.searchTerm}&search=node`
        const url2 = `https://authenticjobs.com/api/?api_key=e2da8aacbfce53f1e1b9559409a51691&format=json&method=aj.jobs.search&keywords=${this.props.searchTerm}`
        
        fetch(url1)
        .then(response => response.json())
        .then(data => {
            console.log('github job api result: ', data)
            this.handleGithubData(data)
        })
        .catch(error => {
            console.log('Search component handleSumbit of github: ', error);
        })
        
        fetch(url2)
        .then(response => response.json())
        .then(data => {
            console.log('authenticjobs api result: ', data)
            this.handleAuthenticData(data.listings.listing)
        })
        .catch(error => {
            console.log('Search component handleSumbit of authenticjobs : ', error);
        })
        
        fetch(LookupIP)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.handleIndeedApi(data.ip)
            
        })
        .catch(error => {
            console.log(error)
        }) 
    }
    
    handleIndeedApi(ip) {
        const url = `http://api.indeed.com/ads/apisearch?publisher=1303284387458115&q=${this.props.searchTerm}&userip=${ip}&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json&limit=25`
        fetch(url)
            // note: if you want to specify saudi add  &l=Saudi+Arabia
            .then(response => response.json())
            .then(data => {
                this.handleIndeedData(data.results)
            })
            .catch(error => {
                console.log('Search component handleSumbit of Indeed: ', error);
            })
    } 
    
    handleGithubData(data) {
        const img = 'https://image.freepik.com/free-icon/blocking-symbol_318-40339.jpg'
        const parsedData = data.map ( job => {
            return{
                title: job.title,
                description: job.description.replace(/<\/?[^>]+(>|$)/g, ""),
                job_url: job.url,
                job_location: job.location,
                company_logo: job.company_logo === null ? img : job.company_logo,
                company_name: job.company
            }
        })
        console.log('handleGithubData', parsedData);
        this.props.handleResults(parsedData)
        
        // this.setState({
        //     results: parsedData
        // })
    }

    handleAuthenticData(listings) {
        const img = 'https://image.freepik.com/free-icon/blocking-symbol_318-40339.jpg'
        const parsedListings = listings.map ( listing => {
            return{
                title: listing.title,
                description: listing.description.replace(/<\/?[^>]+(>|$)/g, ""),
                job_url: listing.company.apply_url,
                job_location: listing.company.location === undefined ? "unknown" : listing.company.location.name ,
                company_logo: img,
                company_name: listing.company.name
            }
        })
        console.log('handleAuthenticData', parsedListings);

        const updatedResults = this.props.results.concat(parsedListings);
        this.props.handleResults(updatedResults);       
        //  console.log('updatedResults ', updatedResults)
        // this.setState({
        //     results: updatedResults
        // })
    }

    handleIndeedData(indeedData){
        const img = 'https://image.freepik.com/free-icon/blocking-symbol_318-40339.jpg'
        const parsedIndeedData = indeedData.map(job => {
            return {
                title: job.jobtitle,
                description: job.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
                job_url: job.url,
                job_location: job.formattedLocationFull === undefined ? "unknown" : job.country,
                company_logo: img,
                company_name: job.company
            }
        })
        console.log('handleIndeedData', parsedIndeedData);

        const updatedResults = this.props.results.concat(parsedIndeedData);
        this.props.handleResults(updatedResults);
    }


    renderResults() {
        return this.props.results.map((job, index) => {
            return <SearchResult handleSaveJob={this.props.handleSaveJob} key={index} job={job} setSelectedJob={this.props.setSelectedJob.bind(job)} showProfile={this.props.showProfile}/>
        })
    }

    // changr the state of the selectedjob when user click on the job
    // setSelectedJob(activeJob) {
    //     this.props.setSelectedJob(activeJob)
    // }

    render() {
        return(
               <div>
                <h1 className="text-bar">Find  available jobs on ..</h1>
                <h2 className="text-bar2">github and authenticjobs</h2>
                <div className="search-container">
                    <form className="search-form" onSubmit={this.handleSumbit.bind(this)}>
                        <input className = "search-bar" type="text" placeholder="Search For Job" onChange={this.handleChange.bind(this)}/>
                        <button className="button-search"><img src="https://i.imgur.com/WX7bym4.png" alt="search"/></button>
                        {/* <img className="img" src="https://slack-imgs.com/?c=1&url=https%3A%2F%2Fi.imgur.com%2F0ZaePDc.jpg" alt="nn"/> */}
                    </form>
                    {this.props.selectedJob === null ? this.renderResults() : <JobDetails userInfo={this.props.userInfo} selectedJob={this.props.selectedJob} handleSaveJob={this.props.handleSaveJob.bind(this)}/> }
                </div>
            </div>

        )
    }
}

export default Search;