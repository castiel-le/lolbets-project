import { Component, Fragment, forwardRef } from "react";

import { Button, Dialog, DialogTitle, DialogContent, Divider, Slide, Avatar, DialogActions } from '@mui/material';
import { styled } from '@mui/system';

import { FlexBoxRow, HorizontalDivider, TypographyBold } from "../../customUIComponents";

import DeleteIcon from "@mui/icons-material/Delete"

import './BetPopup.module.css';
import { SnackbarContext } from '../../Snackbar/SnackbarContext'
import CancelAndSubmitButtons from "./CancelAndSubmitButtons";
import ConfirmationBox from "./ConfirmationBox";
import UserInputForBetAmount from "./UserInputForBetAmount";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// style applied to the team avatar that the user selects
const LogoAvatar = styled(Avatar)((props) => ({
    height: '64px', 
    width: '64px',
    // If the selected team is not null
    // and the team selected is the same this teams number, apply this style
    transform: props.selectedTeam === props.avatarTeam && props.selectedTeam !== null 
        ? 'scale(1.1)' : 'scale(0.7)', 
    // if the selected team is not this team, make the current logo gray
    filter: props.selectedTeam !== props.avatarTeam && props.selectedTeam !== null 
        ? 'grayscale(1)' : 'grayscale(0)'
}));

// style applied to the button that holds the logo avatars
const LogoButton = styled(Button)((props) => ({
    width: '100%', 
    backgroundColor: props.selectedTeam === props.avatarTeam ? '#1E2A32' : 'inherit', 
    marginLeft: 'auto',
    marginRight: 'auto',
    border: props.selectedTeam === props.avatarTeam ? '1px solid rgb(0,100,100)' : 'inherit',
}));

export default class PlaceBetPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: null,
            openConfirmation: false,
            existingBet: false,
            validInput: false,
            betAmount: 0
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.openConfirmationBox = this.openConfirmationBox.bind(this);
        this.submitBet = this.submitBet.bind(this);
        this.fillInEditBet = this.fillInEditBet.bind(this);
        this.deleteBetParticipant = this.deleteBetParticipant.bind(this);
    }

    /**
     * Logic for when the Dialog Box is closed without a bet entered
     * @param {Boolean} betSuccess if the bet successfully closed
     * @param {*} closeNotificationType does not need to be defined, but if it is then it determines the notification popup type
     * @param {*} closeNotificationMessage does not need to be defined, but if it is then it determines the notification message
     */
    closeDialog(betSuccess, closeNotificationType, closeNotificationMessage) {
        this.setState({
            selectedTeam: null,
            betAmount: 0,
        })
        this.props.toggleOpenBet(betSuccess, closeNotificationType, closeNotificationMessage);
    }

    /**
     * Logic needed when the user clicks the place bet button inside the button
     */
    openConfirmationBox() {
        // if the bet is between 1 and max, show the confirmation box and the user selected a team
        if (this.state.selectedTeam !== null && this.state.betAmount > 0 && this.state.betAmount <= this.props.user.coins) {
            this.setState({
                openConfirmation: true,
            });
        } else if (this.state.selectedTeam === null) {
            this.context.setSnackbar(true, 'Select a team first', 'error');
        } else {
            this.context.setSnackbar(true, 'Enter a bet amount first ', 'error');
        }
    }

    /**
     * Called when the user confirms their bet amount
     * @param {Boolean} accepted whether the user confirmed their bet or not
     */
    async submitBet(accepted, betID, userID, teamID, amount) {
        // since I store the selected team as 1 or 2, I use that logic to get the real id from team1 or team2 props
        teamID = teamID === 1 ? this.props.bet.team1.team_id : this.props.bet.team2.team_id;
        if (accepted) {
            let response = await fetch(`/api/bets/join?bet=${betID}&user=${userID}&team=${teamID}&amount=${amount}`, {method: 'put'});
            if (response.ok) {
                this.closeDialog(true);
            } else {
                this.context.setSnackbar(true, 'Unable to place bet', 'error');
            }
            
        }
        this.setState({
            openConfirmation: false,
        })

    }

    /**
     * Finds whether the user has a current bet on the bet selected
     * If they do have a bet, set the state of the popup to be the same as their previous bet
     */
    fillInEditBet() {
        // reset existing bet state
        this.setState({
            existingBet: false,
        })
        for (let i = 0; i < this.props.existingBets.length; i++) {
            if (this.props.existingBets[i].bet_id === this.props.bet.betID && this.props.bet.betID !== null) {
                this.setState({
                    betAmount: this.props.existingBets[i].amount_bet,
                    selectedTeam: this.props.existingBets[i].team_betted_on === this.props.bet.team1.team_id ? 1 : 2,
                    existingBet: true
                })
            }
        }
    }

    /**
     * Deletes a users current bet on a match
     * Displays an error message if the response was not ok
     * If Delete worked it displays an info notification to the user to let them know
     * @param {Number} betID the id for the bet that will be deleted
     */
    async deleteBetParticipant(betID) {
        const selectedTeamName = this.state.selectedTeam === 1 ? this.props.bet.team1.team_name : this.props.bet.team2.team_name;
        const response = await fetch(`/api/bets/delete?bet=${betID}&user=${this.props.user.id}`, {method: 'DELETE'});
        if (response.ok) {
            this.closeDialog(true, 'info', `Bet for ${selectedTeamName} Removed`)
        } else {
            this.context.setSnackbar(true, 'Unable to Remove Bet', 'error');
        }
    }

    /**
     * I used this to determine whether or not the component should try to fill it's state with a previous bet
     * @param {*} prevProps the props before the current render
     */
    componentDidUpdate(prevProps) {
        if (prevProps.bet === null && this.props.bet !== null) {
            this.fillInEditBet();
        }
    }

    render() {
        if (this.props.bet === null) {
            return null;
        }
        return(
            <Fragment>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.closeDialog(false)}
                    aria-describedby="alert-dialog-slide-description"
                    PaperProps={{
                        style: {
                            backgroundColor: '#223039',
                            boxShadow:'0 0px 10px #f9f9f9',
                            width: '300px',
                            p: 1
                        },
                    }}
                >

                    <DialogTitle>
                        <TypographyBold fontSize={20}>
                            {this.state.existingBet ? "Edit Bet" : "Place Bet"}
                        </TypographyBold>    
                        <HorizontalDivider width='100%' />
                    </DialogTitle>

                    <DialogContent sx={{py: 0}}>

                        {/* Team Selection */}
                        <FlexBoxRow 
                            sx={{justifyContent: 'space-between', 
                                height: '84px', 
                                my: 'auto'}} 
                        >
                            <LogoButton 
                                onClick={() => this.setState({selectedTeam: 1})}
                                selectedTeam={this.state.selectedTeam}
                                avatarTeam={1}
                            >
                                <LogoAvatar  
                                    src={this.props.bet.team1.logo}
                                    alt={this.props.bet.team1.team_name}
                                    selectedTeam={this.state.selectedTeam}
                                    avatarTeam={1}
                                />
                            </LogoButton>
                        
                            <Divider orientation="vertical" sx={{borderColor: 'rgb(0,100,100)'}}/>

                            <LogoButton
                                onClick={() => this.setState({selectedTeam: 2})}
                                selectedTeam={this.state.selectedTeam}
                                avatarTeam={2}
                            >
                                <LogoAvatar  
                                    src={this.props.bet.team2.logo}
                                    alt={this.props.bet.team2.team_name}
                                    selectedTeam={this.state.selectedTeam}
                                    avatarTeam={2}
                                />
                            </LogoButton>
                        </FlexBoxRow>
                        {/* End Team Selection */}
                        
                        <UserInputForBetAmount 
                            betAmount={this.state.betAmount} 
                            updateBetAmount={(amount) => this.setState({betAmount: amount})}
                            user={this.props.user}
                            variant={"quickBet"}
                        />

                    </DialogContent>

                    <DialogActions >
                        {this.state.existingBet
                            ? <Button onClick={() => {
                                this.deleteBetParticipant(this.props.bet.betID);
                            }}>
                                <DeleteIcon sx={{color: 'white'}}/>
                            </Button>
                            : null
                        }
                        <CancelAndSubmitButtons cancel={() => this.closeDialog(false)} submit={() => this.openConfirmationBox()}/>
                    </DialogActions>
            
                </Dialog>

                <ConfirmationBox
                    open={this.state.openConfirmation} 
                    selectNo={
                        () => this.submitBet(false, this.props.bet.betID, this.props.user.id, this.state.selectedTeam, this.state.betAmount)
                    }
                    selectYes={
                        () => this.submitBet(true, this.props.bet.betID, this.props.user.id, this.state.selectedTeam, this.state.betAmount)
                    }
                    confirmationMessage={`Bet ${this.state.betAmount} on ${this.state.selectedTeam === 1 ? this.props.bet.team1.team_name : this.props.bet.team2.team_name}?`}
                />

            </Fragment>
        );
    }
}

PlaceBetPopup.contextType = SnackbarContext;
