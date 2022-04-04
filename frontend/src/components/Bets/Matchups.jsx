import { Component, Fragment } from 'react';
import { InView } from 'react-intersection-observer'
import { getFormattedDate, getGameStartTimeObject, sortMatchesByDate } from './helperFunctions';

import BetBox from './BetBox'
import PlaceBetPopup from './BetCreation/PlaceBetPopup';
import { Box, ListItem, List, Tab, TabsContext } from '@mui/material';
import { DateText } from './styledElements';
import { HorizontalDivider, Loading, TypographyBold } from '../customUIComponents';
import '../../fonts/fonts.module.css';
import { SnackbarContext } from '../Snackbar/SnackbarContext'

import withRouter from '../withRouter';
import CreateBetButton from './BetCreation/CreateBetButton';
import CreateBetPopup from './BetCreation/CreateBetPopup';

class Matchups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedBet: null,
            upcomingMatches: [],
            upcomingMatchesByDate: [],
            noUpcomingGames: false,
            allFetchedDates: [0],
            lastFetchedDate: new Date(1648184400000).setHours(0, 0, 0, 0),
            fetching: false,
            mounted: true,
            userCurrentBets: [],
            showCreateBetPopup:false,
        };
        this.toggleOpenBet = this.toggleOpenBet.bind(this);
        this.selectBet = this.selectBet.bind(this);
        this.fetchUpcomingMatches = this.fetchUpcomingMatches.bind(this);
        this.fetchAllUserBets = this.fetchAllUserBets.bind(this);
        this.userHasExistingBet = this.userHasExistingBet.bind(this);
        this.createBet = this.createBet.bind(this);
    }

    componentDidMount() {
        this.fetchUpcomingMatches(1);
        // if user is logged in, fetch their bets
        if (Object.keys(this.props.user).length !== 0) {
            this.fetchAllUserBets(this.props.user.id);
        }
        // fetch all matches starting from today
        this.setState({
            allFetchedDates: [this.state.lastFetchedDate]
        });
        
    }

    componentWillUnmount() {
        this.setState({
            mounted: false
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.loading === true && nextState.loading === false) {
            return true;
        } else if (this.state.upcomingMatchesByDate !== nextState.upcomingMatchesByDate) {
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
     * This fetches fetch a certain number of days worth of games from the database
     * Default start day is today
     * If there is no result from the initial fetch,
     * then the fetch will try for the next set of days
     * Will stop trying to fetch if the fetch for 2 weeks from now has not returned anything
     * @param {number} days The number of days you want to fetch data for.
     * @returns returns if there was an error in the fetch
     */
    async fetchUpcomingMatches(days) {
        if (this.state.allFetchedDates.includes(this.state.lastFetchedDate)) {
            return;
        }
        let nextDay = this.state.lastFetchedDate + days * 86400 * 1000;
        let response = await fetch(`/api/matches?afterthis=${this.state.lastFetchedDate}&beforethis=${nextDay}`);
        if (!response.ok) {
            console.error("Error fetching matches: " + response.status);
            // TODO: add other error logic
            return;
        }
        this.setState({
            allFetchedDates: [...this.state.allFetchedDates, this.state.lastFetchedDate]
        },
        async () => {
            // This was added to solve a memory leak
            // If you delete it, the application will freeze
            if (this.state.mounted) {
                let matches = await response.json();
                // If the result set of the fetch is 0 data, fetch the next n days
                if (Object.keys(matches).length === 0) {
                    let today = new Date().setHours(0, 0, 0, 0);
                    // If we have tried fetching for over 2 weeks of data, 
                    // and nothing has returned, 
                    // display that their are no upcoming games
                    if (nextDay - today < 28 * 86400 * 1000) {
                        this.setState({
                            lastFetchedDate: nextDay
                        },
                        () => this.fetchUpcomingMatches(1));
                    } else {
                        this.setState({
                            loading: false,
                            noUpcomingGames: true,
                        });
                    }
                } else {
                    this.setState({
                        loading: false,
                        upcomingMatches: [...this.state.upcomingMatches, ...matches],
                        upcomingMatchesByDate: [
                            ...this.state.upcomingMatchesByDate, 
                            ...sortMatchesByDate(matches)
                        ],
                        lastFetchedDate: nextDay,
                        fetching: false,
                    });
                }
            }
        });
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

    componentDidUpdate(prevProps) {
        // mitigates a refresh bug
        // If this is not here then when the user refreshes their current bets won't show
        if (prevProps.user !== this.props.user) {
            this.fetchAllUserBets(this.props.user.id);
        }
    }

    createBet() {
        this.setState({
            showCreateBetPopup: true,
        });
    }

    render() {
    // return that there are no upcoming games if none were fetched
        if (this.state.noUpcomingGames && this.state.upcomingMatchesByDate === []) {
            return (
                <TypographyBold sx={{ marginTop: '10%' }}>
                    No Upcoming Games in the next 2 weeks
                </TypographyBold>
            );
        }
        return (
            <Fragment >
                {!this.state.loading
                // if upcoming matches are set, render a bet box for each match by date
                    ?

                    this.state.upcomingMatchesByDate.map((date, index, {length}) => {
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
                                        initialInView={true}
                                        onChange={(inView) => {
                                            // if you are currently looking at the 
                                            // last date on the current page
                                            // fetch the next date
                                            if ( inView && 
                                                !this.state.fetching && 
                                                index + 1 === length
                                            ) {
                                                this.setState({
                                                    fetching: true
                                                },
                                                () => this.fetchUpcomingMatches(1)
                                                );
                                            }
                                        }}
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

                <CreateBetButton createBet={this.createBet}/>

                <CreateBetPopup 
                    open={this.state.showCreateBetPopup} 
                    closeCreateBet={() => this.setState({showCreateBetPopup: false})}
                    dates={this.state.upcomingMatchesByDate}
                    user={this.props.user}
                />

            </Fragment>
        );
    }
}

Matchups.contextType = SnackbarContext;

export default withRouter(Matchups);
