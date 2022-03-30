import { Component, Fragment } from 'react';
import { FlexBoxRow } from '../../customUIComponents';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import Diamond from '@mui/icons-material/Diamond';
import QuickBetButtons from './QuickBetButtons';

/**
 * Used for user input of gems for bet
 * Handles input logiv
 * props:
 * betAmount: state of the current bet amount
 * updateBetAmount: update the state of betAmount
 * user: logged in user
 * variant: "quickBet" if you want the quick bet buttons
 */
export default class UserInputForBetAmount extends Component {

    constructor(props) {
        super(props);
        this.betAmountChangeTextField = this.betAmountChangeTextField.bind(this);
    }

    /**
     * Used to avoid the user inputing a negative bet amount
     * And does not allow the user to input a value higher than their account balance
     * @param {Number} amount Amount the user just input
     */
    betAmountChangeTextField(amount) {
        if (amount < 0) {
            this.props.updateBetAmount(0);
        } else if (amount > this.props.user.coins)  {
            this.props.updateBetAmount(this.props.user.coins);
        }
        this.props.updateBetAmount(amount);
    }

    render() {
        return (
            <Fragment>
                <FlexBoxRow>
                    <FormControl sx={{ my: 2, width: '96px', mx:'auto' }}>
                        <TextField
                            id="standard-number"
                            type="number"
                            variant="standard"
                            value={this.props.betAmount}
                            required
                            sx={{
                                input: {
                                    color: '#f9f9f9', 
                                    justifyContent: 'center', 
                                    textAlign: 'end'
                                }
                            }}
                            InputProps={{
                                startAdornment: 
                                <InputAdornment position="start" sx={{color: '#f9f9f9'}}>
                                    <Diamond />
                                </InputAdornment>,
                            }}
                            onChange={(event) => {
                                this.betAmountChangeTextField(event.target.valueAsNumber);
                            }}
                        />
                    </FormControl>
                </FlexBoxRow>

                {/* If this is the quickBet variant, render a row of quick bet buttons */}
                {this.props.variant === "quickBet" && 
                <QuickBetButtons 
                    betAmount={this.props.betAmount} 
                    updateBetAmount={this.props.updateBetAmount}
                    coins={this.props.user.coins}
                /> 
                }
            </Fragment>
        );
    }
}