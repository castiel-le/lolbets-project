import { Component } from 'react';
import SearchBar from './SearchBar';
import SearchedTable from './SearchedTable'

import { FlexBoxColumn, TypographyLight } from "../customUIComponents";
import { CircularProgress } from '@mui/material';

/**
 * Component that contains the search bar and result table
 */
class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            loading: false,
            didFetchUsers: false,
        }
        this.updateUsersState = this.updateUsersState.bind(this);
        this.updateLoadingState = this.updateLoadingState.bind(this);
    }

    /**
     * Function to get fetch user result from child SearchBar
     * @param {*} childUsers 
     */
    updateUsersState(childUsers){
        this.setState({
            users: childUsers,
            didFetchUsers: true
        });
    }

    /**
     * Function to check if it's currently fetching or not, to set the loading
     * @param {*} loadStatus 
     */
    updateLoadingState(loadStatus){
        this.setState({
            loading: loadStatus
        });
    }

    render(){
        return (
            <FlexBoxColumn>
                <SearchBar updateUsersState={this.updateUsersState} updateLoadingState={this.updateLoadingState}/>
                
                {!this.state.loading ?
                    /* Check if there was a search attempt */
                    this.state.didFetchUsers ?
                        /* Check if search result returns a result */
                        this.state.users.length <= 0 ?
                            <TypographyLight>no users matched</TypographyLight> :
                            <SearchedTable remaining={this.state.users}/>
                        /* Display nothing if there was no search yet */
                        : null
                    : <CircularProgress sx={{ mx:'auto', color: 'white' }}/>
                }
            </FlexBoxColumn>
        );
    }
}

export default SearchResults;