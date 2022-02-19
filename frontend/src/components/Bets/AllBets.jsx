import { Box } from '@mui/system';
import { Component, Fragment } from 'react';

import { getFormattedDate, getGameStartTimeObject, sortMatchesByDate } from './helperFunctions';
import BetBox from './BetBox'
import PlaceBetPopup from './PlaceBetPopup';
import { ListItem, List } from '@mui/material';

import './BetBox.css'
import { DateText } from './styledElements';
import { HorizontalDivider, Loading } from '../customUIComponents';

export default class AllBets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      betOpen: false,
      selectedBet: null,
      upcomingMatches: [],
      upcomingMatchesByDate: []
    };
    this.toggleOpenBet = this.toggleOpenBet.bind(this);
    this.selectBet = this.selectBet.bind(this);
    this.fetchAllUpcomingMatches = this.fetchAllUpcomingMatches.bind(this);
  }

  componentDidMount() {
    // fetch all matches starting from today
    this.fetchAllUpcomingMatches(new Date().setHours(0, 0, 0, 0));
  }

  /**
     * Fetches all the upcoming matches in the database
     * @returns returns if there was an error in the fetch
     */
  async fetchAllUpcomingMatches(beginningDate) {
    let in3Days = beginningDate + 3 * 86400 * 1000; 
    let response = await fetch(`/api/matches?afterthis=${beginningDate}&beforethis=${in3Days}`);
    if (!response.ok) {
      console.error("Error fetching matches: " + response.status);
      // TODO: add other error logic
      return;
    }
    let matches = await response.json();
    this.setState({
      loading: false,
      upcomingMatches: [...this.state.upcomingMatches, ...matches],
      upcomingMatchesByDate: [...this.state.upcomingMatchesByDate, ...sortMatchesByDate(matches)]
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
                <List >
                  {date.map(match => {
                    return (
                      <ListItem key={match.match_id}>
                        <BetBox
                          date={matchDate}
                          time={getGameStartTimeObject(new Date(match.match_start_time))}
                          team1={match.team1_id}
                          team2={match.team2_id}
                          selectBet={this.selectBet}
                        />
                      </ListItem>
                    )
                  })}
                </List>
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