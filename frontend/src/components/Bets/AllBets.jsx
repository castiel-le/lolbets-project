import { Component, Fragment } from 'react';
import { InView } from 'react-intersection-observer'
import { getFormattedDate, getGameStartTimeObject, sortMatchesByDate } from './helperFunctions';

import BetBox from './BetBox'
import PlaceBetPopup from './BetCreation/PlaceBetPopup';
import { Box, ListItem, List } from '@mui/material';
import { DateText } from './styledElements';
import { HorizontalDivider, Loading, TypographyBold } from '../customUIComponents';
import './BetBox.css'
import Notification from '../Notification';

export default class AllBets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedBet: null,
            upcomingMatches: [],
            upcomingMatchesByDate: [],
            noUpcomingGames: false,
            allFetchedDates: [0],
            lastFetchedDate: new Date().setHours(0, 0, 0, 0),
            fetching: false,
            mounted: true,
            showSuccessNotification: false,
        };
        this.toggleOpenBet = this.toggleOpenBet.bind(this);
        this.selectBet = this.selectBet.bind(this);
        this.fetchUpcomingMatches = this.fetchUpcomingMatches.bind(this);
    }

    componentDidMount() {
        this.fetchUpcomingMatches(1);
        // fetch all matches starting from today
        this.setState({
            allFetchedDates: [this.state.lastFetchedDate]
        },
        )
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
        return false;
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
                    if (nextDay - today < 14 * 86400 * 1000) {
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
    toggleOpenBet(betSubmitted) {
        if (this.state.selectedBet !== null) {
            this.setState({
                selectedBet: null,
            });
        }
        if (betSubmitted) {
            this.setState({
                showSuccessNotification: true,
            });
        }
    }

    /**
     * When the use clicks the bet button, tell them application which bet was selected
     * When selectedBet state is set, the popup shows up
     * @param {*} team1 Team 1 of selected bet
     * @param {*} team2 Team 2 of selected bet
     */
    selectBet(team1, team2) {
        this.setState({
            selectedBet: {team1: team1, team2: team2},
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
                                                return (
                                                    <ListItem key={match.match_id}>
                                                        <BetBox
                                                            key={match.match_id}
                                                            date={gameTime}
                                                            time={getGameStartTimeObject(gameTime)}
                                                            team1={match.team1_id}
                                                            team2={match.team2_id}
                                                            selectBet={this.selectBet}
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
                />

                <Notification 
                    open={this.state.showSuccessNotification} 
                    close={() => this.setState({
                        showSuccessNotification: false,
                    })}
                    type='success'
                    message='Bet Placed'
                />
                
            </Fragment>
        );
    }
}