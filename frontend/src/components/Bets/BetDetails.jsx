import {Component, Fragment} from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import { BetComparisonBar, CustomCountdown } from './styledElements';
import { 
    FlexBoxRow, 
    FlexBoxColumn, 
    TypographyLight, 
    TypographyBold, 
    TypographyMedium 
} from '../customUIComponents';

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
                                    {(Math.round(this.props.team1.wins / this.props.team1.losses * 100) / 100).toFixed(2)}x
                                </TypographyMedium>
                                <TypographyMedium fontSize={16} mx='auto'>
                                    {(Math.round(this.props.team2.wins / this.props.team2.losses * 100) / 100).toFixed(2)}x
                                </TypographyMedium>
                            </FlexBoxRow>
                        </FlexBoxColumn>
                    </FlexBoxRow>
          
                    <FlexBoxRow width='20%' >
                        <FlexBoxColumn width='100%' justifyContent='center' alignItems='center'>
                            <BetComparisonBar
                            /* 
                            Set team 1 percent to result of team 1 bet divided by total bet.
                            Otherwise, set to 0 
                            */
                                team1Percent={this.props.totalBet
                                    ? this.props.team1Bet
                                        ? Math.round(this.props.team1Bet / this.props.totalBet * 100)
                                        : 0
                                    : 0
                                } 
                                width='100%'
                                visibility={this.props.totalBet}
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
                                    {this.props.totalBet ? this.props.totalBet : 0}
                                </TypographyLight>
                            </FlexBoxRow>
                        </FlexBoxColumn>
                    </FlexBoxRow>
          
                </FlexBoxRow>
            </Fragment>
        );
    }
}