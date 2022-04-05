import {Component} from 'react';
import {BetButtonStyleExpanded, BetButtonStyle} from '../styledElements';
import { FlexBoxColumn, FlexBoxRow } from '../../customUIComponents';
import EditAndDeleteButtons from './EditAndDeleteButtons';

export default class BetButton extends Component {

    render() {
        return (
            <FlexBoxRow width='10%'>
                
                
                {this.props.existingBet
                    ? 
                    <FlexBoxColumn sx={{mx: 'auto'}}>
                        <EditAndDeleteButtons 
                            onEdit={() => {
                                this.props.selectBet(this.props.betID, this.props.team1, this.props.team2);
                            }} 
                            onDelete={() => {
                                this.props.delete(this.props.betID);
                            }} 
                        />
                    </FlexBoxColumn>
                    
                    :
                    this.props.expanded
                        ?
                        <BetButtonStyleExpanded
                            onClick={() => {
                                this.props.selectBet(
                                    this.props.betID, this.props.team1, this.props.team2
                                )
                            }}
                        >
                            Bet
                        </BetButtonStyleExpanded>
                        :
                        <BetButtonStyle
                            sx={{ my: 'auto' }}
                            onClick={() => {
                                this.props.selectBet(
                                    this.props.betID, this.props.team1, this.props.team2
                                )
                            }}
                        >
                            Bet
                        </BetButtonStyle>
                }
            </FlexBoxRow>
        );
    }
}