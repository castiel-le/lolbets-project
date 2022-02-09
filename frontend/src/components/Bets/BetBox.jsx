import {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';

import './BetBox.css'

export default class BetBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    return (
      <Fragment >
        <Box
          sx={{ display: 'flex', p: 1, bgcolor: 'inherit', justifyContent: 'center', width: '85%', mx: 'auto' }}
        >
          <Item sx={{ flexGrow: 1, bgcolor: 'inherit', border: '0px' }}>
          <Accordion expanded={this.state.expanded} onChange={this.handleExpand} sx={{ flexGrow: 1, backgroundColor: '#090e13 ', color: '#f9f9f9' }}>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{display: 'flex', ":hover": {backgroundColor: '#1E2A32'}, ":focus": {backgroundColor: 'inherit'}}}
            >
              {/* This section takes care of them time */}
              <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Box sx={{ width: '10%', flexShrink: 0, display: 'flex', flexDirection: 'row', minWidth: '84px' }} >
                  <Typography fontFamily={'Lemon-Milk-Bold'} fontSize='32px' >
                    {this.props.time.hour}
                  </Typography>
                  <Typography fontFamily={'Lemon-Milk-Bold'} py='5px'>
                    {this.props.time.min} {this.props.time.period}
                  </Typography>
                </Box>
              
                {/* This section takes care of the middle avatars */}
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start'}}>
                      <Typography fontFamily={'Lemon-Milk-Medium'} mx='24px' textAlign={'right'} my='auto' fontSize='18px'>
                        {this.props.team1.name}
                      </Typography>
                      <Typography fontFamily={'Lemon-Milk-Light'} mx='30px' textAlign={'right'} my='auto' fontSize='14px'>
                        {this.props.team1.wins} - {this.props.team1.losses}
                      </Typography>
                  </Box>
                  <Avatar my='auto' src={this.props.team1.image} sx={{ height: '72px', width: '72px'}}/>
                  <Typography fontFamily={'Lemon-Milk-Light'} fontSize='14px' mx='32px' textAlign={'center'} my='auto'>
                    VS
                  </Typography>
                  <Avatar my='auto' src={this.props.team2.image} sx={{ height: '72px', width: '72px'}}/>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start'}}>
                    <Typography fontFamily={'Lemon-Milk-Medium'} mx='24px' textAlign={'left'} my='auto' fontSize='18px'>
                      {this.props.team2.name}
                    </Typography>
                    <Typography fontFamily={'Lemon-Milk-Light'} mx='30px' textAlign={'left'} my='auto' fontSize='14px'>
                      {this.props.team2.wins} - {this.props.team2.losses}
                    </Typography>
                  </Box>
                  
                </Box>

                {/* This is here so that the avatars are centered*/}
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '10%' }}>
                  <Button 
                      variant='contained' 
                      onClick={() => this.props.selectBet(1, this.props.team1, this.props.team2)}
                      sx={{ boxShadow: 'unset',borderRadius: 16, backgroundColor: 'unset', color: '#f9f9f9', fontFamily: 'Lemon-Milk-Bold', height: '45px', width: '85px', fontSize: '26px', marginLeft: 'auto', ":hover": {backgroundColor: '#f9f9f9', color: '#111111'}}}>
                      Bet
                  </Button>
                  
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
          </Item>
        </Box>
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
