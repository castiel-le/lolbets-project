import { Box } from '@mui/system';
import {Component} from 'react';

import { getFormattedDate, getGameStartTimeObject } from './helperFunctions';
import BetBox from './BetBox'
import PlaceBetPopup from './PlaceBetPopup';

export default class AllBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            betOpen: false,
            selectedBet: null,
            upcomingMatches: null
        };
        this.toggleOpenBet = this.toggleOpenBet.bind(this);
        this.selectBet = this.selectBet.bind(this);
        this.fetchAllUpcomingMatches = this.fetchAllUpcomingMatches.bind(this);
    }

    componentDidMount() {
        this.fetchAllUpcomingMatches();
    }

    /**
     * Fetches all the upcoming matches in the database
     * @returns returns if there was an error in the fetch
     */
    async fetchAllUpcomingMatches() {
         let response = await fetch("/api/matches");
         if (!response.ok) {
             console.error("Error fetching matches: "+ response.status);
             // TODO: add other error logic
             return;
         }
         this.setState({
             upcomingMatches: await response.json()
         })
    }

    /**
     * If the user selects a bet, open the popup
     */
    toggleOpenBet() {
        if (this.state.betOpen) {
            this.setState({
                betOpen: false,
                selectedBet: null,
            });
        } else {
            this.setState({
                betOpen: true,
            });
        }
    }

    /**
     * When the use clicks the bet button, tell them application which bet was selected
     * @param {*} bet 
     * @param {*} team1 
     * @param {*} team2 
     */
    selectBet(bet, team1, team2) {
        this.setState({
            selectedBet: bet,
            betTeams: [team1, team2]
        });
        this.toggleOpenBet();
    }

    render() {
        return (
            <div style={{ backgroundColor: '#0f1519', height: '100%'}}>
                {this.state.upcomingMatches 

                // if upcoming matches are set, render this
                ? 
                this.state.upcomingMatches.map( match => {
                    let date = new Date(match.match_start_time);
                    let formattedDate = getFormattedDate(date);

                    return (
                        <Box key={match.match_id}>
                        <h1>{formattedDate}</h1>
                        <BetBox 
                            time={getGameStartTimeObject(date)} 
                            team1ID={match.team1_id}
                            team2ID={match.team2_id}
                            selectBet={this.selectBet}
                        />
                        </Box>
                    )
                })

                // if the upcoming matches are not set do not display anything
                : null
                }
                {/*this.state.betOpen
                ? <PlaceBetPopup 
                    open={this.state.betOpen} 
                    bet={this.state.selectedBet} 
                    toggleOpenBet={this.toggleOpenBet} 
                />
                : null
                */}
                
            </div>
        );
    }
}