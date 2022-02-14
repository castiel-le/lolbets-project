import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';

import { getTeamObject, fetchTeamInfo } from './helperFunctions';

import BetDetails from './BetDetails';

export default class BetBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      team1: null,
      team2: null
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.fetchTeamDetails = this.fetchTeamDetails.bind(this);
  }

  componentDidMount() {
    this.fetchTeamDetails();
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
        {
          this.state.team1 && this.state.team2
            ?
            <Box
              sx={{ display: 'flex', p: 1, bgcolor: 'inherit', justifyContent: 'center', width: '85%', mx: 'auto' }}
            >
              <Item sx={{ flexGrow: 1, bgcolor: 'inherit', border: '0px' }}>
                <Accordion expanded={this.state.expanded} onChange={(event) => this.handleExpand(event)} sx={{ flexGrow: 1, backgroundColor: '#223039', color: '#f9f9f9' }}>
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{ display: 'flex', ":hover": { backgroundColor: this.state.expanded ? 'inherit' : '#1E2A32' } }}
                  >
                    {/* This section takes care of them time */}
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Box sx={{ width: '10%', flexShrink: 0, display: 'flex', flexDirection: 'row', minWidth: '84px' }} >
                        <Typography fontFamily={'Lemon-Milk-Bold'} fontSize='32px' >
                          {this.props.time.hour}
                        </Typography>
                        <Typography fontFamily={'Lemon-Milk-Bold'} py='5px'>
                          {this.props.time.min} {this.props.time.period}
                        </Typography>
                      </Box>
                      {/* End of the time section*/}

                      {/* This section takes care of the middle avatars */}
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
                          <Typography fontFamily={'Lemon-Milk-Medium'} mx='24px' textAlign={'right'} my='auto' fontSize='20px'>
                            {this.state.team1.name}
                          </Typography>
                          <Typography fontFamily={'Lemon-Milk-Light'} mx='30px' textAlign={'right'} my='auto' fontSize='14px'>
                            {this.state.team1.wins} - {this.state.team1.losses}
                          </Typography>
                        </Box>
                        <Avatar my='auto' src={this.state.team1.image} sx={{ height: '72px', width: '72px' }} />
                        <Typography fontFamily={'Lemon-Milk-Light'} fontSize='14px' mx='32px' textAlign={'center'} my='auto'>
                          VS
                        </Typography>
                        <Avatar my='auto' src={this.state.team2.image} sx={{ height: '72px', width: '72px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
                          <Typography fontFamily={'Lemon-Milk-Medium'} mx='24px' textAlign={'left'} my='auto' fontSize='20px'>
                            {this.state.team2.name}
                          </Typography>
                          <Typography fontFamily={'Lemon-Milk-Light'} mx='30px' textAlign={'left'} my='auto' fontSize='14px'>
                            {this.state.team2.wins} - {this.state.team2.losses}
                          </Typography>
                        </Box>
                      </Box>
                      {/* End of middle avatar section */}


                      {/* This holds the bet button to the top right of the bet box */}
                      <Box sx={{ display: 'flex', flexDirection: 'row', width: '10%' }}>
                        <Button
                          variant='contained'
                          onClick={() => this.props.selectBet({ team1: this.state.team1, team2: this.state.team2 }, this.state.team1, this.state.team2)}
                          sx={{ my: this.state.expanded ? 'inherit' : 'auto', textDecoration: 'underline', boxShadow: 'unset', borderRadius: 16, backgroundColor: this.state.expanded ? '#f9f9f9' : 'unset', color: this.state.expanded ? '#111111' : '#f9f9f9', fontFamily: 'Lemon-Milk-Bold', height: '45px', width: '85px', fontSize: '26px', marginLeft: 'auto', ":hover": { textDecoration: 'underline', backgroundColor: this.state.expanded ? 'gray' : '#f9f9f9', color: '#111111' } }}>
                          Bet
                        </Button>
                      </Box>
                      {/* End of button placement */}

                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <BetDetails />
                  </AccordionDetails>
                </Accordion>
              </Item>
            </Box>
            : null
        }
      </Fragment>
    );
  }
}

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
