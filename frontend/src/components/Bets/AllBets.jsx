import {Component} from 'react';

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
            <div style={{ backgroundColor: '#0f1519', height: '85vh'}}>
                <BetBox 
                    time={{'hour': '8', 'min': '00', 'period': 'PM'}} 
                    team1={{name: 'Cloud 9', image: 'https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png', wins: 2, losses: 0}}
                    team2={{name: 'Team SoloMid', image: 'https://cdn.pandascore.co/images/team/image/387/team-solomid-bjjwknt9.png', wins: 1, losses: 2}}
                    selectBet={this.selectBet}
                />
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