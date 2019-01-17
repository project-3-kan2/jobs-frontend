import React , { Component } from 'react';
import SearchResult from './SearchResult';
import JobDetails from './JobDetails';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            // results: [],
            selectedJob: null
        }
    }

    handleChange(event) {
        // const userInput = event.target.value;
        // const updateSearchTerm = userInput.split(' ').join('-');
        this.setState({
            searchTerm: event.target.value,
            results: []
        })
    }

    handleSumbit(event) {
        event.preventDefault();
        this.setState({
            selectedJob: null
        })
        const LookupIP = 'https://ipapi.co/json/';

        const url1 = `https://jobs.github.com/positions.json?description=${this.state.searchTerm}&search=node`
        const url2 = `https://authenticjobs.com/api/?api_key=${process.env.Authentic_API}&format=json&method=aj.jobs.search&keywords=${this.state.searchTerm}`

        fetch(LookupIP)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // currentIp = data.ip;
            // console.log (currentIp);
            fetch(`http://api.indeed.com/ads/apisearch?publisher=${process.env.indeed_API}&q=${this.state.searchTerm}&userip=${data.ip}&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json&limit=25`)
            // note: if you want to specify saudi add  &l=Saudi+Arabia
            .then(response => response.json())
            .then(indeed =>{
                this.handleIndeedData(indeed)
            })
            .catch(error => {
                console.log('Search component handleSumbit of Indeed: ', error);
            })

        })
        

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
    handleIndeedData(indeed){
        const img = 'https://image.freepik.com/free-icon/blocking-symbol_318-40339.jpg'
        parsedIndeedData = data.map ( data => {
            return {
                title : results.jobtitle,
                description: results.snippet,
                job_url: results.url,
                job_location: results.formattedLocationFull,
                company_logo: img,
                company_name: results.company
            }
        })
        const updatedIndeedData = this.props.results.concat(parsedIndeedData);
        this.props.handleResults(updatedIndeedData);
    }

    renderResults() {
        return this.props.results.map((job, index) => {
            return <SearchResult handleSaveJob={this.props.handleSaveJob} key={index} job={job} setSelectedJob={this.setSelectedJob.bind(this)}/>
        })
    }

    // changr the state of the selectedjob when user click on the job
    setSelectedJob(activeJob) {
        this.setState({
            selectedJob: activeJob
        })
    }

    render() {
        return(
            <div>
                <h1>Search For Job</h1>
                <div className="search-container">
                    <form className="search-form" onSubmit={this.handleSumbit.bind(this)}>
                        <input type="text" onChange={this.handleChange.bind(this)}/>
                        <button><img src="https://i.imgur.com/WX7bym4.png" alt="search"/></button>
                    </form>
                    {this.state.selectedJob === null ? this.renderResults() : <JobDetails userInfo={this.props.userInfo} selectedJob={this.state.selectedJob}/> }
                </div>
            </div>
        )
    }
}

export default Search;