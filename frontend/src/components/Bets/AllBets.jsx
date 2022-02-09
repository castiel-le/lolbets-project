import {Component} from 'react';

import BetBox from './BetBox'
import PlaceBetDrawer from './PlaceBetDrawer';

export default class AllBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            selectedBet: null,
            betTeams: []
        };
        this.toggleOpenDrawer = this.toggleOpenDrawer.bind(this);
        this.selectBet = this.selectBet.bind(this);
    }

    toggleOpenDrawer() {
        if (this.state.drawerOpen) {
            this.setState({
                drawerOpen: false,
                selectedBet: null,
                betTeams: []
            });
        } else {
            this.setState({
                drawerOpen: true,
            });
        }
    }

    selectBet(bet, team1, team2) {
        this.setState({
            selectBet: bet,
            betTeams: [team1, team2]
        });
        this.toggleOpenDrawer();
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
                <PlaceBetDrawer open={this.state.drawerOpen} toggleOpenDrawer={this.toggleOpenDrawer} />
            </div>
        );
    }
}