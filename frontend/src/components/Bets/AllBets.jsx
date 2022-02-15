import { Box } from '@mui/system';
import { Component } from 'react';

import { getFormattedDate, getGameStartTimeObject, sortMatchesByDate } from './helperFunctions';
import BetBox from './BetBox'
import PlaceBetPopup from './PlaceBetPopup';
import { Divider, ListItem, Typography, List } from '@mui/material';

import './BetBox.css'

export default class AllBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            betOpen: false,
            selectedBet: null,
            upcomingMatches: null,
            upcomingMatchesByDate: null
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
            console.error("Error fetching matches: " + response.status);
            // TODO: add other error logic
            return;
        }
        let matches = await response.json();
        this.setState({
            upcomingMatches: matches,
            upcomingMatchesByDate: sortMatchesByDate(matches)
        });
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
            <div style={{ backgroundColor: '#0f1519', height: '100%' }}>
                {this.state.upcomingMatchesByDate

                    // if upcoming matches are set, render this
                    ?

                    this.state.upcomingMatchesByDate.map(date => {
                        let matchDate = new Date(date[0].match_start_time);
                        let formattedDate = getFormattedDate(matchDate);
                        return (
                            <Box key={date} paddingTop='24px'>
                                <Typography fontFamily={'Lemon-Milk-Bold'} fontSize="24px" sx={{ color: "#f9f9f9" }} display="flex" flexDirection="row" width="85%" mx="auto">
                                    {formattedDate}
                                </Typography >
                                <Divider variant="fullWidth" orientation='horizontal' flexItem='true' sx={{ borderColor: '#f9f9f9', width: '85%', height: '5px', mx: 'auto' }} />
                                <List >
                                    {date.map(match => {
                                        return (
                                            <ListItem >
                                                <BetBox
                                                    key={match.match_id}
                                                    time={getGameStartTimeObject(new Date(match.match_start_time))}
                                                    team1={match.team1_id}
                                                    team2={match.team2_id}
                                                    selectBet={this.selectBet}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Box>
                        );
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