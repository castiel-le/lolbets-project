import {Component} from 'react';
import {BetButtonStyleExpanded, BetButtonStyle} from '../styledElements';
import { FlexBoxRow } from '../../customUIComponents';

export default class BetButton extends Component {

    render() {
        if (this.props.expanded) {
            return (
                <FlexBoxRow width='10%'>
                    <BetButtonStyleExpanded
                        onClick={() => {
                            this.props.selectBet(
                                this.props.betID, this.props.team1, this.props.team2
                            )
                        }}
                    >
                        {this.props.existingBet ? "Edit" : "Bet"}
                    </BetButtonStyleExpanded>
                </FlexBoxRow>
            );
        } else {
            return (
                <FlexBoxRow width='10%' >
                    <BetButtonStyle
                        sx={{ my: 'auto' }}
                        onClick={() => {
                            this.props.selectBet(
                                this.props.betID, this.props.team1, this.props.team2
                            )
                        }}
                    >
                        {this.props.existingBet ? "Edit" : "Bet"}
                    </BetButtonStyle>
                </FlexBoxRow>
            );
        }
    }
}