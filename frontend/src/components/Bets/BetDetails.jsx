import { Typography } from '@mui/material';
import {Component, Fragment} from 'react';
import Countdown from 'react-countdown';
import { BetComparisonBar, FlexBoxColumn, FlexBoxRow } from './styledElements';

export default class BetDetails extends Component {

  render() {
    console.log(this.props.date);

    return (

      <Fragment>
        <FlexBoxRow width='100%'>
          <FlexBoxColumn alignItems='center' width='15%'>
            <Countdown date={Date.now() + new Date(this.props.date.get)} />
            <Typography >
            Close Time: 123
            </Typography>
          </FlexBoxColumn>
          
          <FlexBoxRow width='70%' justifyContent='center'>
            <Typography >
            Win Rate team 1
            </Typography>
            <Typography >
            Win Rate team 2
            </Typography>
          </FlexBoxRow>
          
          <FlexBoxRow width='15%' >
            <BetComparisonBar team1Percent={60}/>
          </FlexBoxRow>
          
        </FlexBoxRow>
      </Fragment>
    );
  }
}