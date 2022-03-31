import { Component } from "react";
import { SnackbarContext } from "../Snackbar/SnackbarContext";

class Search extends Component {
    static contextType = SnackbarContext;

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
        // check if string is not all whitespace
        if (this.state.keyword.replace(/\s/g, '').length > 0) {
            this.props.updateLoadingState(true);
        } else {
            this.context.setSnackbar(true, "Cannot search with an empty input", "error");
        }
    }

    async submit(event){
        event.preventDefault();

        // check if string is not all whitespace
        if (this.state.keyword.replace(/\s/g, '').length > 0) {
            let searchURL = "/api/user/search";
            let searchResults = await fetch(searchURL + "?keyword=" + this.state.keyword);
            if (searchResults.ok){
                this.props.updateUsersState(await searchResults.json());
                this.props.updateLoadingState(false);
            } else {
                console.error("Something went wrong.");
                this.context.setSnackbar(true, "Something went wrong. Please try searching again", "error");
            }
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