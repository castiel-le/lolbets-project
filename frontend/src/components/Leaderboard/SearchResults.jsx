import { Component } from 'react';
import SearchBar from './SearchBar';
import SearchedTable from './SearchedTable'
import LeaderboardTable from './LeaderboardTable';

import { FlexBoxColumn, FlexBoxRow, TypographyBold, TypographyLight, TypographyMedium } from "../customUIComponents";
import { CircularProgress } from '@mui/material';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
        this.updateUsersState = this.updateUsersState.bind(this);
    }

    updateUsersState(childUsers){
        this.setState({
            users: childUsers
        });
        console.log(this.state.users);
    }

    render(){
        return (
            <FlexBoxColumn>
                <SearchBar updateUsersState={this.updateUsersState}/>
                
                {this.state.users.length <= 0 ?
                    <TypographyLight>no users matched</TypographyLight> :
                    <SearchedTable remaining={this.state.users}/>
                }
            </FlexBoxColumn>
        );
    }
}

export default SearchResults;