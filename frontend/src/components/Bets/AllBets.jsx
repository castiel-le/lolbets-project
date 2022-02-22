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
      lastFetchedDate: null,
      mounted: true
    };
    this.toggleOpenBet = this.toggleOpenBet.bind(this);
    this.selectBet = this.selectBet.bind(this);
    this.fetchAllUpcomingMatches = this.fetchAllUpcomingMatches.bind(this);
  }

  componentDidMount() {
    // fetch all matches starting from today
    this.fetchAllUpcomingMatches(new Date().setHours(0, 0, 0, 0));
  }
  componentWillUnmount() {
    this.setState({
      mounted: false
    })
  }

  /**
     * Fetches all the upcoming matches in the database
     * @returns returns if there was an error in the fetch
     */
  async fetchAllUpcomingMatches(beginningDate) {
    let nextDay = beginningDate + 1 * 86400 * 1000; 
    let response = await fetch(`/api/matches?afterthis=${beginningDate}&beforethis=${nextDay}`);
    if (!response.ok) {
      console.error("Error fetching matches: " + response.status);
      // TODO: add other error logic
      return;
    }
    // This was added to solve a memory leak
    // If you delete it, the application will freeze
    if (this.state.mounted) {
      let matches = await response.json();
      // If the result set of the fetch is 0 data, fetch the next 3 days
      if (Object.keys(matches).length === 0) {
        let today = new Date().setHours(0, 0, 0, 0);
        // If we have tried fetching for over 2 weeks of data, 
        // and nothing has returned, 
        // display that their are no upcoming games
        if (nextDay - today < 14 * 86400 * 1000) {
          this.fetchAllUpcomingMatches(nextDay)
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
          lastFetchedDate: nextDay
        });
      }
    }
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
        <TypographyBold sx={{marginTop: '10%'}}>
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
              <Box key={date} paddingTop='24px' >
                <DateText width='85%' mx='auto' >
                  {formattedDate}
                </DateText >
                <HorizontalDivider width='85%' />
                <InView 
                  key={date} 
                  threshold={0.7} 
                  triggerOnce={true}
                  delay={1000}
                  onChange={() => {
                    let matchDate = new Date(date[0].match_start_time);
                    
                    // Remove accidental fetch of data for the same date twice
                    if (matchDate.getDate() !== new Date(this.state.lastFetchedDate).getDate()) {
                      this.fetchAllUpcomingMatches(this.state.lastFetchedDate)
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