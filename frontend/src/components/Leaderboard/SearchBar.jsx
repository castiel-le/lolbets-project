import { Component } from "react";
import minorStyling from "./minorStyling.css";

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ""
        }

        this.submit = this.submit.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
        this.setLoadingToTrue = this.setLoadingToTrue.bind(this);
    }

    keywordChange(event){
        this.setState({
            keyword: event.target.value
        });
    }

    setLoadingToTrue(){
        this.props.updateLoadingState(true);
    }

    async submit(event){
        event.preventDefault();
        let searchURL = "/api/user/search";
        let searchResults = await fetch(searchURL + "?keyword=" + this.state.keyword);
        if (searchResults.ok){
            this.props.updateUsersState(await searchResults.json());
            this.props.updateLoadingState(false);
        } else {
            console.error("Something went wrong.");
        }
    }

    async enterSearch(e) {
        if (e === 'Enter') {
            await this.submit();
        }
    }

    render(){
        return (
            <div className="searchContainer">
                <form onSubmit={this.submit}>
                    <input placeholder="Search" onChange={this.keywordChange} onKeyUp={this.enterSearch.bind(this)} className="searchInput"/>
                    <button type="submit" className="searchButton" onClick={this.setLoadingToTrue}>Search</button>
                </form>
            </div>
        )
    }
}

export default Search;