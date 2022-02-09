import {Component} from 'react';

import BetBox from './BetBox'

export default class AllBets extends Component {

    render() {
        return (
            <div style={{ backgroundColor: '#0f1519', height: '85vh'}}>
                <BetBox 
                    time={{'hour': '8', 'min': '00', 'period': 'PM'}} 
                    team1={{name: 'Cloud 9', image: 'https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png', wins: 2, losses: 0}}
                    team2={{name: 'Team SoloMid', image: 'https://cdn.pandascore.co/images/team/image/387/team-solomid-bjjwknt9.png', wins: 1, losses: 2}}
                />
            </div>
        );
    }
}