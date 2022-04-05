import {Component} from 'react';
import { FlexBoxColumn, FlexBoxRow } from '../../customUIComponents';
import EditAndDeleteButtons from './EditAndDeleteButtons';
import {styled, Button} from '@mui/material';

/**
 * Bet button in bet view styled
 */
const BetButtonStyle = styled(Button)({
    variant: 'contained',
    margin: 'auto',
    textDecoration: 'underline',
    boxShadow: 'unset',
    borderRadius: 16,
    backgroundColor: 'unset',
    color: '#f9f9f9',
    fontFamily: 'Lemon-Milk-Bold',
    height: '45px',
    width: '85px',
    fontSize: '26px',
    marginLeft: 'auto',
    ":hover": {
        textDecoration: 'underline',
        backgroundColor: '#f9f9f9',
        color: '#111111'
    }
});

/**
 * Styling of the bet button when the bet details are shown
 */
const BetButtonStyleExpanded = styled(BetButtonStyle)({
    margin: 'inherit, 0px',
    backgroundColor: '#f9f9f9',
    color: '#111111',
    ":hover": {
        backgroundColor: 'gray',
    }
});

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