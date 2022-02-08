import {Component} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button } from '@mui/material';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

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
      <div style={{ width: '100%' }}>
        <Box
          sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, justifyContent: 'center', width: '80%' }}
        >
          <Item sx={{ flexGrow: 1 }}>
          <Accordion expanded={this.state.expanded} onChange={this.handleExpand} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{display: 'flex'}}
            >
              {/* This section takes care of them time */}
              <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Box sx={{ width: '10%', flexShrink: 0, display: 'flex', flexDirection: 'row' }} >
                  <Typography fontFamily={'Lemon-Milk-Bold'} fontSize='32px' >
                    {this.props.time.hour}
                  </Typography>
                  <Typography fontFamily={'Lemon-Milk-Bold'} py='5px'>
                    {this.props.time.min} {this.props.time.period}
                  </Typography>
                </Box>
              
                {/* This section takes care of the middle avatars */}
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Typography>
                    {this.props.team1}
                  </Typography>
                  <Avatar />
                  <SportsMmaIcon />
                  <Avatar />
                  <Typography>
                    {this.props.team2}
                  </Typography>
                </Box>
                
                {/* This is here so that the avatars are centered*/}
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
          <Item>
            <Button >
              Bet
            </Button>
          </Item>
        </Box>
      </div>
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
