import { Component } from "react";
import { Navigate } from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ""
        }

        this.submit = this.submit.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
    }

    keywordChange(event){
        this.setState({
            keyword: event.target.value
        });
    }

    async submit(event){
        event.preventDefault();
        let searchURL = "/api/user/search";
        let searchResults = await fetch(searchURL + "?keyword=" + this.state.keyword);
        console.log(searchURL);
        if (searchResults.ok){
            this.props.updateUsersState(await searchResults.json());
        } else {
            console.error("Something went wrong.");
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input onChange={this.keywordChange} />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default Search;