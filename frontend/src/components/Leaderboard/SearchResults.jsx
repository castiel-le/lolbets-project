import { Component } from 'react';
import SearchBar from './SearchBar';
import SearchedTable from './SearchedTable'

import { FlexBoxColumn, TypographyLight } from "../customUIComponents";
import { CircularProgress } from '@mui/material';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            loading: false
        }
        this.updateUsersState = this.updateUsersState.bind(this);
        this.updateLoadingState = this.updateLoadingState.bind(this);
    }

    updateUsersState(childUsers){
        this.setState({
            users: childUsers
        });
    }

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
                    this.state.users.length <= 0 ?
                        <TypographyLight>no users matched</TypographyLight> :
                        <SearchedTable remaining={this.state.users}/>
                    : <CircularProgress sx={{ mx:'auto', color: 'white' }}/>
                }
            </FlexBoxColumn>
        );
    }
}

export default SearchResults;