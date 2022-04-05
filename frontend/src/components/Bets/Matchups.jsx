import { Component, Fragment } from 'react';
import { InView } from 'react-intersection-observer'
import { getFormattedDate, getGameStartTimeObject } from './helperFunctions';

import BetBox from './BetBox'
import PlaceBetPopup from './BetCreation/PlaceBetPopup';
import { Box, ListItem, List} from '@mui/material';
import { DateText } from './styledElements';
import { HorizontalDivider, Loading, TypographyBold } from '../customUIComponents';
import '../../fonts/fonts.module.css';
import { SnackbarContext } from '../Snackbar/SnackbarContext'

import withRouter from '../withRouter';

class Matchups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedBet: null,
            userCurrentBets: []
        };
        this.toggleOpenBet = this.toggleOpenBet.bind(this);
        this.selectBet = this.selectBet.bind(this);
        this.fetchAllUserBets = this.fetchAllUserBets.bind(this);
        this.userHasExistingBet = this.userHasExistingBet.bind(this);
        this.deleteBetParticipant = this.deleteBetParticipant.bind(this);
    }

    componentDidMount() {
        // if user is logged in, fetch their bets
        if (Object.keys(this.props.user).length !== 0) {
            this.fetchAllUserBets(this.props.user.id);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.upcomingMatchesByDate !== nextProps.upcomingMatchesByDate) {
            return true;
        }
        if (this.state.selectedBet !== nextState.selectBet) {
            return true;
        }
        if (this.state.userCurrentBets !== nextState.userCurrentBets) {
            return true;
        }
        return false;
    }

    /**
     * Fetchs all the bets for the current user
     * @param {Number} userID The current logged in user ID
     */
    async fetchAllUserBets(userID) {
        let response = await fetch(`/api/allbets/${userID}`);
        if (response.ok) {
            this.setState({
                userCurrentBets: await response.json(),
            });
        } else {
            console.error('unable to fetch user bets for current user');
        }
    }

    /**
     * Closes the bet popup
     * Will show a notification if the user submitted a bet
     * @param {Boolean} betSubmitted if the user submitted a bet, show a notification confirming they did successfully
     */
    async toggleOpenBet(betSubmitted, notificationType, notificationMessage) {
        if (this.state.selectedBet !== null) {
            this.setState({
                selectedBet: null,
            });
        }
        if (betSubmitted && notificationType && notificationMessage) {
            //refetch current user info to get their updated coins
            this.props.updateUser();
            this.context.setSnackbar(true, notificationMessage, notificationType);
        } else if (betSubmitted) {
            this.context.setSnackbar(true, 'Bet Placed', 'success');
        }
        // if user is logged in, update the bets they have places
        if (this.props.user.id !== null) {
            //refetch current user info to get their updated coins
            await this.props.updateUser();
            this.fetchAllUserBets(this.props.user.id);
        }
    }

    /**
     * When the use clicks the bet button, tell them application which bet was selected
     * When selectedBet state is set, the popup shows up
     * If the user is not logged in, redirect them to login
     * @param {*} team1 Team 1 of selected bet
     * @param {*} team2 Team 2 of selected bet
     */
    selectBet(betID, team1, team2) {
        if(this.props.user.id === null) {
            this.props.navigate("/api/login/federated/google");
        } else {
            this.setState({
                selectedBet: {betID: betID, team1: team1, team2: team2},
            });
        }
    }

    /**
     * Determines whether the user has a bet already placed on this match or not
     * @param {JSON} match json object for current match
     * @returns a boolean on whether or not the user has a bet already placed for that bet
     */
    userHasExistingBet(match) {
        // if the bet object is null then it is impossible to place a bet
        if (match.bet === null) {
            return false;
        }
        for (let i = 0; i < this.state.userCurrentBets.length; i++) {
            if (this.state.userCurrentBets[i].bet_id === match.bet.bet_id) {
                return true;
            }
        }
        return false;
    }

    /**
     * Deletes a users current bet on a match
     * Displays an error message if the response was not ok
     * If Delete worked it displays an info notification to the user to let them know
     * @param {Number} betID the id for the bet that will be deleted
     */
    async deleteBetParticipant(betID) {
        const response = await fetch(`/api/bets/delete?bet=${betID}&user=${this.props.user.id}`, {method: 'DELETE'});
        if (response.ok) {
            this.context.setSnackbar(true, `Bet Removed Successfully`, 'info');
            for (let i = 0; i < this.state.userCurrentBets.length; i++) {
                if (this.state.userCurrentBets[i].bet_id === betID) {
                    // remove the bet that was just deleted without fetching from the db
                    const newUserBets = this.state.userCurrentBets;
                    newUserBets.splice(i, 1);
                    this.setState({
                        userCurrentBets: newUserBets
                    });
                }
            }
        } else {
            this.context.setSnackbar(true, 'Unable to Remove Bet', 'error');
        }
    }

    componentDidUpdate(prevProps) {
        // mitigates a refresh bug
        // If this is not here then when the user refreshes their current bets won't show
        if (prevProps.user !== this.props.user) {
            this.fetchAllUserBets(this.props.user.id);
        }
    }

    render() {
    // return that there are no upcoming games if none were fetched
        if (this.props.upcomingMatchesByDate === [] && this.props.countDatesFetched > 14) {
            return (
                <TypographyBold sx={{ marginTop: '10%' }}>
                    No Upcoming Games in the next 2 weeks
                </TypographyBold>
            );
        }
        return (
            <Fragment >
                {this.props.upcomingMatchesByDate.length > 0
                // if upcoming matches are set, render a bet box for each match by date
                    ?

                    this.props.upcomingMatchesByDate.map((date, index, {length}) => {
                        let matchDate = new Date(date[0].match_start_time);
                        let formattedDate = getFormattedDate(matchDate);
                        return (
                            <Fragment key={matchDate} >
                                <Box paddingTop='24px' >
                                    <DateText width='85%' mx='auto' >
                                        {formattedDate}
                                    </DateText >
                                    <HorizontalDivider width='85%' />
                                    <InView 
                                        as={'div'}
                                        initialInView={false}
                                        onChange={(inView) => {
                                            // if you are currently looking at the 
                                            // last date on the current page
                                            // fetch the next date
                                            if ( inView && 
                                                index + 1 === length
                                            ) {
                                                this.props.fetchUpcomingMatches(1)
                                            }
                                        }
                                        }
                                    >
                                        <List >
                                            {date.map(match => {
                                                let gameTime = new Date(match.match_start_time);
                                                const existingBet = this.userHasExistingBet(match);
                                                const betID = match.bet ? match.bet.bet_id : null;
                                                return (
                                                    <ListItem key={match.match_id}>
                                                        <BetBox
                                                            key={match.match_id}
                                                            date={gameTime}
                                                            time={getGameStartTimeObject(gameTime)}
                                                            team1={match.team1_id}
                                                            team2={match.team2_id}
                                                            selectBet={this.selectBet}
                                                            deleteBetParticipant={this.deleteBetParticipant}
                                                            betID={betID}
                                                            existingBet={existingBet}
                                                            team1Bet={match.team1Total}
                                                            totalBet={match.total_bet}
                                                        />
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </InView>
                                </Box>
                            </Fragment>
                        );
                    })

                    // if the upcoming matches are not set display a loading screen
                    :
                    <Loading />
                }

                <PlaceBetPopup 
                    // if a bet is currently selected, open the popup
                    open={this.state.selectedBet !== null ? true : false} 
                    bet={this.state.selectedBet} 
                    toggleOpenBet={this.toggleOpenBet}
                    user={this.props.user} 
                    existingBets={this.state.userCurrentBets}
                /> 

            </Fragment>
        );
    }
}

Matchups.contextType = SnackbarContext;

export default withRouter(Matchups);
