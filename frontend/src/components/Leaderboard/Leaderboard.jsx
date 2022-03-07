/* eslint-disable indent */
/* eslint-disable max-len */
import { Component } from "react";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardRank2To5 from "./LeaderboardRank2To5";
import { CircularProgress} from "@mui/material";
import { Icecream } from '@mui/icons-material';
import poro2 from './images/poro2.png';
import { FlexBoxColumn, FlexBoxRow, TypographyBold, TypographyLight, TypographyMedium } from "../customUIComponents";

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
        } else {
            throw new Error("no users for page: " + page);
        }
    }

    async setUsers(page){
        try {
            this.setState({remaining: await this.getNextUsers(page), usersNotLoaded: false});
        } catch(e){
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
        // Styling
        const rank1CardStyle = {height:'100px', backgroundColor: 'rgba(19, 60, 121, 0.96)', borderRadius: '5px', padding: '10px', margin: '10px 0', width: '60%'};
        const rankBoxStyle = {width: '75px', mr: '10px', alignItems: 'center', borderRadius: '10px', backgroundColor: 'rgba(255, 155, 0, 0.3)'};
        const ranks2To5ContainerStyle = {width:'100%', mx:'auto', margin: '10px 0', justifyContent: 'space-between', padding: '10px', backgroundColor: 'rgba(19, 60, 121, 0.96)', borderRadius: '5px', height: '120px', alignItems: 'center'};
        
        // eslint-disable-next-line no-extra-parens
        return !this.state.top5NotLoaded ? (
            <FlexBoxColumn width="80%" sx={{mx:'auto', alignItems: 'center'}}>
                <FlexBoxRow>
                    <TypographyBold sx={{mx:'auto'}}>Leaderboard</TypographyBold>
                </FlexBoxRow>
                {/* 1st rank */}
                <FlexBoxRow style={rank1CardStyle}>
                    <FlexBoxRow>
                        <FlexBoxColumn style={rankBoxStyle}>
                            <TypographyMedium sx={{ my:'auto', color: '#ff9b00', fontSize: '40px', borderBottom: '2px #ff9b00 solid', width: '40%'}}>1</TypographyMedium>
                        </FlexBoxColumn>
                        <FlexBoxColumn sx={{ my: 'auto', mx: '20px', color: 'white'}}>
                            <img src={poro2}/>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[0].username}</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <TypographyLight sx={{ my:'auto', ml: '10px'}}>{this.state.top5[0].coins}</TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                </FlexBoxRow>
                <FlexBoxRow style={ranks2To5ContainerStyle}>
                    {/* Ranks 2-5 */}
                    <LeaderboardRank2To5 user={this.state.top5[1]} rank={2}/>
                    <LeaderboardRank2To5 user={this.state.top5[2]} rank={3}/>
                    <LeaderboardRank2To5 user={this.state.top5[3]} rank={4}/>
                    <LeaderboardRank2To5 user={this.state.top5[4]} rank={5}/>
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