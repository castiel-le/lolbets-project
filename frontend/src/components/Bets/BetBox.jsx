import { Component, Fragment } from 'react';

import { Box, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { getTeamObject, fetchTeamInfo } from './helperFunctions';
import { FlexBoxRow, BetButton, BetAccordion, Item, TimeBox, TeamBox } from './styledElements';
import BetDetails from './BetDetails';

export default class BetBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.fetchTeamDetails = this.fetchTeamDetails.bind(this);
  }

  async fetchTeamDetails() {
    let jsonTeam1 = await fetchTeamInfo(this.props.team1ID);
    let jsonTeam2 = await fetchTeamInfo(this.props.team2ID);

    this.setState({
      team1: getTeamObject(await jsonTeam1),
      team2: getTeamObject(await jsonTeam2)
    });
  }

  /**
   * Determines whether or not the bet should show details
   */
  handleExpand(event) {
    console.log(event.target.tagName)
    if (event.target.tagName.toLowerCase() !== "button") {
      this.setState({
        expanded: !this.state.expanded
      })
    }
  }

  render() {
    return (
      <Fragment >
        <Box
          sx={{ bgcolor: 'inherit', width: '82%', mx: 'auto' }}
        >
          <Item sx={{ flexGrow: 1, my: '0px', bgcolor: 'inherit', border: '0px' }}>
            <BetAccordion 
              expanded={this.state.expanded} 
              onChange={(event) => this.handleExpand(event)} 
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{ 
                  display: 'flex',
                  ":hover": { backgroundColor: this.state.expanded ? 'inherit' : '#1E2A32' } 
                }}
              >
                <FlexBoxRow width='100%'>

                  <TimeBox time={this.props.time} />

                  <TeamBox left={true} team={this.props.team1} />
                  <Typography
                    fontFamily={'Lemon-Milk-Light'}
                    fontSize='14px'
                    mx='32px'
                    textAlign={'center'}
                    my='auto'
                    sx={{ display: 'flex', width: '2%', justifyContent: 'center' }}>
                    VS
                  </Typography>
                  <TeamBox left={false} team={this.props.team2} />

                  <BetButton expanded={this.state.expanded} selectBet={this.props.selectBet} />

                </FlexBoxRow>
              </AccordionSummary>

              <AccordionDetails>
                <BetDetails />
              </AccordionDetails>

            </BetAccordion>
          </Item>
        </Box>
      </Fragment >
    );
  }
}
