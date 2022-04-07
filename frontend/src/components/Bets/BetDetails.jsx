import {Component, Fragment} from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import { BetComparisonBar } from './styledElements';
import { 
    FlexBoxRow, 
    FlexBoxColumn, 
    TypographyLight, 
    TypographyBold, 
    TypographyMedium, 
    HorizontalDivider
} from '../customUIComponents';
import { styled, Box } from '@mui/material';
import Countdown from 'react-countdown';
import TeamVSTeamLogos from '../ReusedComponents/TeamVSTeamLogos';
import EditAndDeleteButtons from './BetCreation/EditAndDeleteButtons'
import { Diamond } from '@mui/icons-material';

/**
 * React Countdown styled
 */
export const CustomCountdown = styled(Countdown)({
    fontFamily: 'Lemon-Milk-Bold',
    fontSize: 24,
    color: '#f9f9f9'
})

/**
 * Returns the timing column on the left of bet details
 * @param date the date and time of the matchup
 */
const Timing = ({date}) => {

    return (
        <FlexBoxColumn alignItems='center' width='20%' justifyContent='center'>
            <CustomCountdown date={date.getTime()} />
            <TypographyLight fontSize={10} sx={{marginTop: '12px'}}>
                          Close Time
            </TypographyLight>
            <TypographyLight fontSize={10} >
                {date.toLocaleString()}
            </TypographyLight>
        </FlexBoxColumn>
    );
}

/**
 * Determines the winning odds for team 1 and team 2
 * @param team1 team 1 that is playing
 * @param team2 team 2 that is playing
 */
const Odds = ({team1, team2}) => {

    return (
        
        <FlexBoxColumn justifyContent='center' >
            <TypographyBold fontSize={24} marginBottom='12px'>
                    Winning Odds
            </TypographyBold>
            <FlexBoxRow width='100%' my={'auto'}>
                <TypographyMedium fontSize={16} mx='auto'>
                    {(Math.round(team1.wins / team1.losses * 100) / 100).toFixed(2)}x
                </TypographyMedium>
                <TypographyMedium fontSize={16} mx='auto'>
                    {(Math.round(team2.wins / team2.losses * 100) / 100).toFixed(2)}x
                </TypographyMedium>
            </FlexBoxRow>
        </FlexBoxColumn>
    );
}

/**
 * Creates the colored bar showing the difference in bets for team1 vs team 2
 * @param team1Bet the amount bet on team 1
 * @param totalBet the total amount bet on this matchup
 */
const BetPool = ({team1Bet, totalBet}) => {
    
    return (
        <FlexBoxColumn width='100%' justifyContent='center' alignItems='center'>
            <BetComparisonBar
                /* 
                    Set team 1 percent to result of team 1 bet divided by total bet.
                    Otherwise, set to 0 
                */
                team1Percent={totalBet
                    ? team1Bet
                        ? Math.round(team1Bet / totalBet * 100)
                        : 0
                    : 0
                } 
                width='100%'
                visibility={totalBet}
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
                    {totalBet ? totalBet : 0}
                </TypographyLight>
            </FlexBoxRow>
        </FlexBoxColumn>
    );
}

/**
 * The bottom section of a matchup accordion
 * Tells the user key aspects about this matchup
 */
export default class BetDetails extends Component {

    render() {
        const matchDate = new Date(this.props.date);

        return (

            <Fragment>

                <FlexBoxRow width='100%' sx={{backgroundColor: '#223039', m: 1}}>
                    {this.props.variant === 'custom' &&
                        <FlexBoxRow width='1.8em' sx={{backgroundColor: `${this.props.categoryColor}`}}/>
                    }
                    <Timing date={matchDate} />

                    {this.props.variant === 'custom'
                        ?  
                        <Fragment>
                            <FlexBoxRow width='100%' sx={{m: 1}}>
                                <TeamVSTeamLogos team1={this.props.team1} team2={this.props.team2}/>
                                <FlexBoxRow width='20%' sx={{justifyContent: 'right'}}>
                                    <FlexBoxColumn sx={{my: 'auto', mr: 2}}>
                                        <TypographyBold >
                                        Payout
                                        </TypographyBold>
                                        <HorizontalDivider width='100%' sx={{mb: 1}}/>
                                        <FlexBoxRow sx= {{mx: 'auto'}}>
                                            <TypographyLight sx={{ml: 'auto', mr: 1, justifyContent: 'center'}}>
                                                {this.props.payout} 
                                            </TypographyLight>
                                            <Diamond sx={{fontSize: 18, color: '#f9f9f9', my: 'auto', mx: '0px'}}/>
                                        </FlexBoxRow>
                                    
                                    </FlexBoxColumn>
                                </FlexBoxRow>
                                <Box sx={{my: 'auto'}}>
                                    <EditAndDeleteButtons 
                                        onEdit={() => this.props.editCustomBet(this.props.index)} 
                                        onDelete={() => this.props.deleteCustomBet(this.props.index)}
                                    />
                                </Box>
                            </FlexBoxRow>
                        </Fragment>

                        : 
                        <Fragment>
                            <FlexBoxRow width='60%' justifyContent='center'>
                                <Odds team1={this.props.team1} team2={this.props.team2} />
                            </FlexBoxRow>
                            <FlexBoxRow width='20%' >
                                <BetPool team1Bet={this.props.team1Bet} totalBet={this.props.totalBet} />
                            </FlexBoxRow>
                        </Fragment>
                    }
                </FlexBoxRow>
            </Fragment>
        );
    }
}