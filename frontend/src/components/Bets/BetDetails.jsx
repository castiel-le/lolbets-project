import {Component, Fragment} from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import { BetComparisonBar, CustomCountdown } from './styledElements';
import { FlexBoxRow, FlexBoxColumn, TypographyLight, TypographyBold, TypographyMedium } from '../customUIComponents';

export default class BetDetails extends Component {

  render() {
    const matchDate = new Date(this.props.date);

    return (

      <Fragment>
        <FlexBoxRow width='100%'>
          <FlexBoxColumn alignItems='center' width='15%'>
            <CustomCountdown date={matchDate.getTime()} />
            <TypographyLight fontSize={10}>
            Close Time
            </TypographyLight>
            <TypographyLight fontSize={10}>
              {matchDate.toLocaleString()}
            </TypographyLight>
          </FlexBoxColumn>
          
          <FlexBoxRow width='70%' justifyContent='center'>
            <FlexBoxColumn >
              <TypographyBold fontSize={24} marginBottom='12px'>
                Winning Odds
              </TypographyBold>
              <FlexBoxRow width='100%'>
                <TypographyMedium fontSize={16} mx='auto'>
                1.35x
                </TypographyMedium>
                <TypographyMedium fontSize={16} mx='auto'>
                2.45x
                </TypographyMedium>
              </FlexBoxRow>
            </FlexBoxColumn>
          </FlexBoxRow>
          
          <FlexBoxRow width='15%' >
            <FlexBoxColumn width='100%' >
              <BetComparisonBar team1Percent={60} width='100%'/>
              <TypographyLight fontSize={10}>
                Current Pool:
              </TypographyLight>
              <TypographyLight fontSize={10}>
                <SavingsIcon /> 1000
              </TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          
        </FlexBoxRow>
      </Fragment>
    );
  }
}