import { Box } from '@mui/system';
import {Component} from 'react';

import { getFormattedDate, getGameStartTimeObject, getTeamObject, fetchTeamInfo } from './helperFunctions';
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

    fetchAllUpcomingMatches() {
        fetch("/api/matches")
        .then(response => {
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
            return response.json();
        })
        .then(json => {
            this.setState({
                upcomingMatches: json
            })
        })
        .catch(error => {
            console.error(error)
        });
    }

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
                    let team1Info = fetchTeamInfo(match.team1_id);
                    let team2Info = fetchTeamInfo(match.team2_id);

                    return (
                        <Box key={match.match_id}>
                        <h1>{formattedDate}</h1>
                        <BetBox 
                            time={getGameStartTimeObject(date)} 
                            team1={team1Info.then(getTeamObject(team1Info), console.error("error"))}
                            team2={getTeamObject(team2Info)}
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