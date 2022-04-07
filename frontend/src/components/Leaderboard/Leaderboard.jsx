/* eslint-disable indent */
/* eslint-disable max-len */
import { Component } from "react";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardRank2To5 from "./LeaderboardRank2To5";
import { CircularProgress} from "@mui/material";
import poro2 from './images/poro2.png';
import stretchedcena from './images/stretchedcena.PNG';
import john from './images/gigascuffed.PNG';
import DiamondIcon from "@mui/icons-material/Diamond";
import { Link } from "react-router-dom";
import minorStyling from './minorStyling.css';
import { FlexBoxColumn, FlexBoxRow, TypographyBold, TypographyLight, TypographyMedium, Loading } from "../customUIComponents";

/**
 * Main leaderboard component, contains ranks 1-5 and a table to display the remaining users
 */
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

    /**
     * Change the value of usersNotLoaded to true or false
     * @param {Boolean} value true or false
     */
    changeUsersNotLoaded(value) {
      this.setState({usersNotLoaded: value});
    }

    /**
     * Sets the state on page change
     * @param {Number} page Table page
     */
    async changePage(page) {
        const tablePage = page - 1;
        
        // Check if new page exceeds current users in the state
        if (tablePage * this.state.rowsPerPage < this.state.remaining.length) {
            this.setState({page: page, usersNotLoaded: false});
        } else {
            // fetch new users
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

    /**
     * Fetch users based on page
     * @param {Number} page Table page
     * @returns 
     */
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

    /**
     * Set the users in state based on page
     * @param {Number} page Table page
     */
    async setUsers(page){
        try {
            this.setState({remaining: await this.getNextUsers(page), usersNotLoaded: false});
        } catch(e){
            console.error(e);
        }
    }

    async componentDidMount(){
        //Fetch for top 5 users
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
        //Set up rank 1's win rate bar display
        let rank1Wins = 0;
        let rank1Losses = 0;
        let rank1WinRate = 0;
        if (!this.state.top5NotLoaded){
            rank1Wins = this.state.top5[0].wins;
            rank1Losses = this.state.top5[0].losses;
            
            if (rank1Wins + rank1Losses !== 0){
                rank1WinRate = Math.round(rank1Wins / (rank1Wins + rank1Losses) * 10000) / 100;
            }
        }
        // Styling
        const rank1CardStyle = {height:'100px', borderRadius: '5px', padding: '10px', margin: '10px 0', width: '60%', backgroundImage: `url(${john})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'};
        const rankBoxStyle = {width: '75px', mr: '10px', alignItems: 'center', borderRadius: '10px', backgroundColor: 'rgba(255, 155, 0, 0.3)'};
        const ranks2To5ContainerStyle = {width:'100%', mx:'auto', margin: '10px 0', justifyContent: 'space-between', padding: '10px', backgroundColor: 'rgba(19, 60, 121, 0.96)', borderRadius: '5px', height: '120px', alignItems: 'center'};
        const rank1IconStyle = {width: '96px', borderRadius: '5px', border: '2px gold solid'};
        const rank1UsernameStyle = {margin: 'auto 0'};
        const coinsAndWinrateStyle = {alignItems: 'center', margin: 'auto 0 auto 75px', width: '125px'}
        const lossesBar = {width: '100%', backgroundColor: 'rgb(238, 90, 82)', height: '10px', borderRadius: '5px'};
        const winsBar = {width: `${rank1WinRate}%`, backgroundColor: 'rgb(61, 149, 229)', borderRadius: '5px'};


        //Check if the fetch for top 5 has been done yet
        return !this.state.top5NotLoaded ? 
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
                            <img src={stretchedcena} style={rank1IconStyle}/>
                        </FlexBoxColumn>
                        <FlexBoxColumn>
                            <Link to={`/user/${this.state.top5[0].user_id}`} style={rank1UsernameStyle}>
                                <TypographyLight>{this.state.top5[0].username}</TypographyLight>
                            </Link>
                        </FlexBoxColumn>
                        <FlexBoxColumn style={coinsAndWinrateStyle}>
                            <FlexBoxRow sx={{ alignItems: 'center' }}>
                                <TypographyMedium>{this.state.top5[0].coins}</TypographyMedium>
                                <DiamondIcon sx={{ fontSize: '1rem', my: 'auto', color: 'lightblue', pl: '3px'}}/>
                            </FlexBoxRow>
                            <TypographyLight>{rank1Wins}W - {rank1Losses}L | {rank1WinRate}%</TypographyLight>
                            <FlexBoxRow style={lossesBar}>
                                <FlexBoxRow style={winsBar} />
                            </FlexBoxRow>
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
        : <Loading />;
    }
}

export default Leaderboard;