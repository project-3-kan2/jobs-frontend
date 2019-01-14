import React , { Component } from 'react';
import SearchResult from './SearchResult'

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            results: []
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
        const url1 = `https://jobs.github.com/positions.json?title=${this.state.searchTerm}&search=node`
        const url2 = `https://authenticjobs.com/api/?api_key=e2da8aacbfce53f1e1b9559409a51691&format=json&method=aj.jobs.search&keywords=${this.state.searchTerm}`

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
        const parsedData = data.map ( job => {
            return{
                title: job.title,
                description: job.description.replace(/<\/?[^>]+(>|$)/g, ""),
                location: job.location,
                company: job.company,
                company_logo: job.company_logo,
                url: job.url
            }
        })
        console.log('handleGithubData', parsedData);

        this.setState({
            results: parsedData
        })
    }

    handleAuthenticData(listings) {
        const parsedListings = listings.map ( listing => {
            return{
                title: listing.title,
                description: listing.description.replace(/<\/?[^>]+(>|$)/g, ""),
                location: listing.company.location.name,
                company: listing.company.name,
                company_logo: listing.company.logo,
                url: listing.company.apply_url
            }
        })
        console.log('handleAuthenticData', parsedListings);

        //to be edit ##########################
        const updatedResults = this.state.results.concat(parsedListings);
        console.log('updatedResults ', updatedResults)
        this.setState({
            results: updatedResults
        })
    }

    renderResults() {
        return this.state.results.map((job, index) => {
            return <SearchResult key={index} job={job}/>
        })
    }

    render() {
        return(
            <div>
                <div className="login-buttons">
                    <p>Register</p>
                    <p></p>
                </div>
                <div className="search-container">
                    <form className="search-form" onSubmit={this.handleSumbit.bind(this)}>
                        <input type="text" onChange={this.handleChange.bind(this)}/>
                        <button><img src="https://i.imgur.com/WX7bym4.png" alt="search"/></button>
                    </form>
                    {this.renderResults()}
                </div>
            </div>
        )
    }
}

export default Search;
