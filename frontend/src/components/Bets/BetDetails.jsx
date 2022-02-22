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
          <FlexBoxColumn alignItems='center' width='20%' justifyContent='center'>
            <CustomCountdown date={matchDate.getTime()} />
            <TypographyLight fontSize={10} marginTop='12px'>
            Close Time
            </TypographyLight>
            <TypographyLight fontSize={10} >
              {matchDate.toLocaleString()}
            </TypographyLight>
          </FlexBoxColumn>
          
          <FlexBoxRow width='60%' justifyContent='center'>
            <FlexBoxColumn justifyContent='center' >
              <TypographyBold fontSize={24} marginBottom='12px'>
                Winning Odds
              </TypographyBold>
              <FlexBoxRow width='100%' my={'auto'}>
                <TypographyMedium fontSize={16} mx='auto'>
                1.35x
                </TypographyMedium>
                <TypographyMedium fontSize={16} mx='auto'>
                2.45x
                </TypographyMedium>
              </FlexBoxRow>
            </FlexBoxColumn>
          </FlexBoxRow>
          
          <FlexBoxRow width='20%' >
            <FlexBoxColumn width='100%' justifyContent='center' alignItems='center'>
              <BetComparisonBar 
                team1Percent={60} 
                width='100%' 
              />
              <TypographyLight fontSize={10} marginTop='12px'>
                Current Pool:
              </TypographyLight>
              <FlexBoxRow 
                width='100%' 
                alignContent='center' 
                justifyContent='center' 
                alignItems='center'
              >
                <SavingsIcon />
                <TypographyLight fontSize={12} marginLeft='5px'>
                  1000
                </TypographyLight>
              </FlexBoxRow>
            </FlexBoxColumn>
          </FlexBoxRow>
          
        </FlexBoxRow>
      </Fragment>
    );
  }
}