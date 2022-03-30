import { Component } from 'react';
import { FlexBoxRow, TypographyBold } from '../../customUIComponents';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

// Styled Buttons for all the quick bets
const QuickBetButton = styled(Button)({
    borderRadius: 16,
    minWidth: '42px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgb(0,100,100)',
    justifyContent:'center',
    ":hover": {
        backgroundColor: 'rgb(0,200,200)'
    }
});

// Options at the bottom of the dialog box for increasing or decreasing the bet amount
// Keep max: it is used to max out the bet to the users total credits
const coinIncreaseButtonAmounts = [-10, -5, +5, +10, 'max'];

export default class QuickBetButtons extends Component {

    /**
     * Adds a quick bet amount to this users current bet amount
     * @param {Number} amount amount to be added to the current bet amount
     */
    addQuickBetAmount(amount) {
        if (amount === 'max' || this.props.betAmount + amount > this.props.coins) {
            this.props.updateBetAmount(this.props.coins);
        } else if (this.props.betAmount + amount > 0) {
            this.props.updateBetAmount(this.props.betAmount + amount);
        } else {
            this.props.updateBetAmount(0);
        }
    }

    render() {
        return (
            <FlexBoxRow width='100%' sx={{justifyContent: 'center', my: 1}}>
                {coinIncreaseButtonAmounts.map((amount, index) => {
                    return (
                        <QuickBetButton 
                            key={index}
                            onClick={() => {
                                this.addQuickBetAmount(amount);
                            }}
                        >
                            <TypographyBold fontSize={10} sx={{color: '#111111'}}>
                                {amount}
                            </TypographyBold>
                        </QuickBetButton>
                    );
                })}
            </FlexBoxRow>
        );
    }
}