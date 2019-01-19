import React, { Component } from 'react';
import SearchResult from './SearchResult';
import JobDetails from './JobDetails';

class Search extends Component {

    // handle the user input term in the search bar
    handleChange(event) {
        const userInput = event.target.value;
        const updateSearchTerm = userInput.split(' ').join('+');
        this.props.setSearchTerm(updateSearchTerm);
    }

    // handle the sumbit of the search bar 
    handleSumbit(event) {
        event.preventDefault();
        this.props.setSelectedJob.bind(null);
        this.props.handleResults([]);

        const LookupIP = 'https://ipapi.co/json/';
        const url1 = `https://jobs.github.com/positions.json?description=${this.props.searchTerm}`
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

        // this fetch return js object returning local IP
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

    // fetch the indeeded api data
    handleIndeedApi(ip) {
        const url = `http://api.indeed.com/ads/apisearch?publisher=1303284387458115&q=${this.props.searchTerm}&userip=${ip}&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json&limit=25`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.handleIndeedData(data.results)
            })
            .catch(error => {
                console.log('Search component handleSumbit of Indeed: ', error);
            })
    }

    // handle the Indeed returning data from the api to objects with data we need
    handleIndeedData(indeedData) {
        const img = "https://ya-webdesign.com/images/job-vector-4.png";
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
    
    // handle the GitHub returning data from the api to objects with data we need
    handleGithubData(data) {
        const img = "https://ya-webdesign.com/images/job-vector-4.png";
        const parsedData = data.map(job => {
            return {
                title: job.title,
                description: job.description.replace(/<\/?[^>]+(>|$)/g, ""),
                job_url: job.url,
                job_location: job.location,
                company_logo: job.company_logo === null ? img : job.company_logo,
                company_name: job.company
            }
        })
        console.log('handleGithubData', parsedData);

        const updatedResults = this.props.results.concat(parsedData);
        this.props.handleResults(updatedResults);
    }

    // handle Authentic returning data from the api to objects with data we need
    handleAuthenticData(listings) {
        const img = "https://ya-webdesign.com/images/job-vector-4.png";
        const parsedListings = listings.map(listing => {
            return {
                title: listing.title,
                description: listing.description.replace(/<\/?[^>]+(>|$)/g, ""),
                job_url: listing.company.apply_url,
                job_location: listing.company.location === undefined ? "unknown" : listing.company.location.name,
                company_logo: img,
                company_name: listing.company.name
            }
        })
        console.log('handleAuthenticData', parsedListings);

        const updatedResults = this.props.results.concat(parsedListings);
        this.props.handleResults(updatedResults);
    }

    // render the jobs that comes from the results array this jobs is related
    // to the user searchTerm
    renderResults() {
        return this.props.results.map((job, index) => {
            return <SearchResult handleSaveJob={this.props.handleSaveJob}
                                 key={index} 
                                 job={job}
                                 setSelectedJob={this.props.setSelectedJob.bind(job)}
                                 showProfile={this.props.showProfile}
                                 />
        })
    }

    // render the selected job when user select one of the job
    renderJobDetails() {
        return (
            <JobDetails userInfo={this.props.userInfo} 
                        selectedJob={this.props.selectedJob} 
                        handleSaveJob={this.props.handleSaveJob.bind(this)}
                        setSelectedJob={this.props.setSelectedJob.bind(this)}
                        />
        )
    }

    render() {
        return (
            <div>
                <h1 className="text-bar">Find  available jobs on ..</h1>
                <h2 className="text-bar2">github , authenticjobs and indeed</h2>
                <div className="search-container">
                    <form className="search-form" onSubmit={this.handleSumbit.bind(this)}>
                        <input className="search-bar" type="text" placeholder="Search For Job" onChange={this.handleChange.bind(this)} />
                        <button className="button-search"><img src="https://i.imgur.com/WX7bym4.png" alt="search" /></button>
                        <img className="img" src="https://slack-imgs.com/?c=1&url=https%3A%2F%2Fi.imgur.com%2F0ZaePDc.jpg" alt="" />
                    </form>
                    {this.props.selectedJob === null ? this.renderResults() : this.renderJobDetails()}
                </div>
            </div>

        )
    }
}

export default Search;