/* eslint-disable indent */
/* eslint-disable max-len */
import { Component } from "react";
import LeaderboardTable from "./LeaderboardTable"
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, TablePagination} from "@mui/material";
import { Android, Icecream } from '@mui/icons-material';
import customUIComponents, { FlexBoxColumn, FlexBoxRow, HorizontalDivider, TypographyBold, TypographyLight, TypographyMedium } from "../customUIComponents";

class Leaderboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            top5: [],
            remaining: [],
            top5NotLoaded: true,
            usersNotLoaded: true,
            rowsPerPage: 10,
            page: 1
        };
        this.changeUsersNotLoaded = this.changeUsersNotLoaded.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setUsers = this.setUsers.bind(this);
    }

    changeUsersNotLoaded(value) {
      this.setState({usersNotLoaded: value});
    }

    async changePage(page) {
        const tablePage = page - 1;
        
        // Check if new page exceeds current matches in the state
        if (tablePage * this.state.rowsPerPage < this.state.remaining.length) {
            this.setState({page: page, usersNotLoaded: false});
        } else {
            // fetch new matches
            try {
                const moreUsers = await this.getNextUsers(page);
                console.log(moreUsers);
                this.setState({ page: page, remaining: this.state.remaining.concat(moreUsers),
                usersNotLoaded: false })
            } catch (e) {
                console.log("no users for page " + page);
            }
        }
    }

    async getNextUsers(page){
        const urlToFetch = "/api/user/rest";

        const userResponse = await fetch(urlToFetch + "?page=" + page);
        console.log(userResponse.url);
        if (userResponse.ok){
            return await userResponse.json();
        }
        else {
            throw new Error("no users for page: " + page);
        }
    }

    async setUsers(page){
        try {
            this.setState({remaining: await this.getNextUsers(page), usersNotLoaded: false});
        }
        catch(e){
            console.error(e);
        }
    }

    async componentDidMount(){
        const urlTop5 = "/api/user/top5";
        try {
            const top5 = await fetch(urlTop5);
            if (top5.ok){
                this.setState({
                    top5: await top5.json(),
                    top5NotLoaded: false
                });
            }
            // eslint-disable-next-line brace-style
        }
        catch (e){
            console.error(e);
        }
    }

    render(){
    // eslint-disable-next-line no-extra-parens
        return !this.state.top5NotLoaded ? (
            <FlexBoxColumn width="80%" sx={{mx:'auto', alignItems: 'center'}}>
                <FlexBoxRow>
                    <TypographyBold sx={{mx:'auto'}}>Leaderboard</TypographyBold>
                </FlexBoxRow>
                {/* 1st rank */}
                <FlexBoxRow sx={{ width: '100%', height:'100px'}} style={{backgroundColor: 'grey', borderRadius: '5px', padding: '10px', margin: '10px 0', width: '60%'}}>
                    <FlexBoxRow>
                        <FlexBoxColumn sx={{ width: '75px', mr: '10px', alignItems: 'center', borderRadius: '10px'}} style={{backgroundColor: 'rgba(255, 155, 0, 0.3)'}}>
                            <TypographyMedium sx={{ my:'auto', color: '#ff9b00', fontSize: '40px', borderBottom: '2px #ff9b00 solid', width: '40%'}}>1</TypographyMedium>
                        </FlexBoxColumn>
                        <FlexBoxColumn sx={{ my: 'auto', transform: 'scale(3)', mx: '20px', color: 'white'}}>
                            <Icecream sx={{ mx: 'auto' }}/>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[0].username}</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my:'auto', ml: '10px'}}>{this.state.top5[0].coins}</TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                </FlexBoxRow>
                <FlexBoxRow sx={{ width:'100%', mx:'auto', margin: '10px 0', justifyContent: 'space-between', padding: '10px', backgroundColor: 'grey', borderRadius: '5px', height: '80px'}}>
                    {/* 2nd rank */}
                    <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
                        <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
                            <TypographyLight sx={{ my: 'auto'}}>2</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[1].username}</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[1].coins}</TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                    {/* 3rd rank */}
                    <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
                        <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
                            <TypographyLight sx={{ my: 'auto'}}>3</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[2].username}</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[2].coins}</TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                    {/* 4th rank */}
                    <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
                        <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
                            <TypographyLight sx={{ my: 'auto' }}>4</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[3].username}</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[3].coins}</TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                    {/* 5th rank */}
                    <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
                        <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
                            <TypographyLight sx={{ my: 'auto' }}>5</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[4].username}</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[4].coins}</TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                </FlexBoxRow>
                <LeaderboardTable 
                    remaining={this.state.remaining}
                    changePage={this.changePage}
                    setUsers={this.setUsers}
                    page={this.state.page}
                    rowsPerPage={this.state.rowsPerPage}
                    usersNotLoaded={this.state.usersNotLoaded}
                    changeUsersNotLoaded={this.changeUsersNotLoaded}
                />
            </FlexBoxColumn>
        ) : <CircularProgress />;
    }
}

export default Leaderboard;