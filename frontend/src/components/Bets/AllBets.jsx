import { Box } from '@mui/system';
import { Component, Fragment } from 'react';
import { InView } from 'react-intersection-observer'

import { getFormattedDate, getGameStartTimeObject, sortMatchesByDate } from './helperFunctions';
import BetBox from './BetBox'
import PlaceBetPopup from './PlaceBetPopup';
import { ListItem, List } from '@mui/material';

import './BetBox.css'
import { DateText } from './styledElements';
import { HorizontalDivider, Loading, TypographyBold } from '../customUIComponents';

export default class AllBets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      betOpen: false,
      selectedBet: null,
      upcomingMatches: [],
      upcomingMatchesByDate: [],
      noUpcomingGames: false,
      allFetchedDates: [0],
      lastFetchedDate: new Date().setHours(0, 0, 0, 0),
      fetching: false,
      mounted: true
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
            upcomingMatchesByDate: [...this.state.upcomingMatchesByDate, ...sortMatchesByDate(matches)],
            lastFetchedDate: nextDay,
            fetching: false,
          });
        }
      }
    });
  }

  /**
     * If the user selects a bet, open the popup
     */
  toggleOpenBet() {
    if (this.state.betOpen) {
      this.setState({
        betOpen: false,
        selectedBet: null,
      });
    } else {
      this.setState({
        betOpen: true,
      });
    }
  }

  /**
     * When the use clicks the bet button, tell them application which bet was selected
     * @param {*} bet 
     * @param {*} team1 
     * @param {*} team2 
     */
  selectBet(bet, team1, team2) {
    this.setState({
      selectedBet: bet,
      betTeams: [team1, team2]
    });
    this.toggleOpenBet();
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

          // if upcoming matches are set, render this
          ?

          this.state.upcomingMatchesByDate.map(date => {
            let matchDate = new Date(date[0].match_start_time);
            let formattedDate = getFormattedDate(matchDate);
            return (
              <Fragment key={matchDate}>
                <Box paddingTop='24px' >
                  <DateText width='85%' mx='auto' >
                    {formattedDate}
                  </DateText >
                  <HorizontalDivider width='85%' />
                  <InView 
                    as={'div'}
                    delay={500}
                    initialInView={true}
                    threshold={0.6}
                    onChange={() => {
                      if (this.state.fetching === false) {
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

          // if the upcoming matches are not set do not display anything
          :
          <Loading />
        }

        {/*this.state.betOpen
                ? <PlaceBetPopup 
                    open={this.state.betOpen} 
                    bet={this.state.selectedBet} 
                    toggleOpenBet={this.toggleOpenBet} 
                />
                : null
                */}
      </Fragment>
    );
  }
}