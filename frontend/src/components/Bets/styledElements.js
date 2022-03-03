import { styled } from '@mui/system';
import { Button, Accordion, Typography, Avatar} from '@mui/material';
import { FlexBoxRow, FlexBoxColumn, TypographyLight } from '../customUIComponents';
import Countdown from 'react-countdown';
import {Link} from 'react-router-dom'

/**
 * Accordion element styled with color options specific to the bet view
 */
export const BetAccordion = styled(Accordion)({
    flexGrow: 1,
    backgroundColor: '#223039',
    color: '#f9f9f9'
});

/**
 * Styled typography for the date header shown in upcoming bets
 */
export const DateText = styled(Typography)({
    fontFamily: 'Lemon-Milk-Bold',
    fontSize: "24px",
    color: "#f9f9f9",
    display: "flex",
    flexDirection: "row",
    margin: 'inherit auto'
});

/**
 * Styled Avatar with specific size for the team logos
 */
export const TeamLogo = styled(Avatar)({
    height: '72px',
    width: '72px',
    ':hover': {
        cursor: 'help'
    }
});

/**
 * Style used for the team names in bet view
 */
export const TeamName = styled(Typography)({
    fontFamily: 'Lemon-Milk-Medium',
    margin: 'auto 24px',
    fontSize: '20px'
});

/**
 * Team win loss ratio displayed in bet view
 */
export const TeamWinLoss = styled(Typography)({
    fontFamily: 'Lemon-Milk-Light',
    margin: '10px 30px',
    fontSize: '14px'
})

/**
 * Bet button in bet view styled
 */
export const BetButtonStyle = styled(Button)({
    variant: 'contained',
    margin: 'auto',
    textDecoration: 'underline',
    boxShadow: 'unset',
    borderRadius: 16,
    backgroundColor: 'unset',
    color: '#f9f9f9',
    fontFamily: 'Lemon-Milk-Bold',
    height: '45px',
    width: '85px',
    fontSize: '26px',
    marginLeft: 'auto',
    ":hover": {
        textDecoration: 'underline',
        backgroundColor: '#f9f9f9',
        color: '#111111'
    }
});

/**
 * Styling of the bet button when the bet details are shown
 */
export const BetButtonStyleExpanded = styled(BetButtonStyle)({
    margin: 'inherit, 0px',
    backgroundColor: '#f9f9f9',
    color: '#111111',
    ":hover": {
        backgroundColor: 'gray',
    }
});

/**
 * React Countdown styled
 */
export const CustomCountdown = styled(Countdown)({
    fontFamily: 'Lemon-Milk-Bold',
    fontSize: 24
})

/**
 * Used to create a team flex box with all the team info
 * @param {*} props props needs a team json with team_name, wins, losses, and logo inside
 * @returns A Box with all the styled team Elements
 */
export function TeamBox(props) {
    if (props.left) {
        return (
            <FlexBoxRow width='40%' sx={{ alignItems: 'center' }}>
                <FlexBoxColumn sx={{ alignContent: 'center', marginLeft: 'auto' }}>
                    <TeamName textAlign={'right'} >
                        {props.team.team_name}
                    </TeamName>
                    <TeamWinLoss textAlign={'right'} >
                        {props.team.wins} - {props.team.losses}
                    </TeamWinLoss>
                </FlexBoxColumn>
                <Link to={`/teams/${props.team.team_id}`}>
                    <TeamLogo my='auto' src={props.team.logo} />
                </Link>
            </FlexBoxRow>
        );
    } else {
        return (
            <FlexBoxRow width='40%' sx={{ alignItems: 'center' }}>
                <Link to={`/teams/${props.team.team_id}`}>
                    <TeamLogo my='auto' src={props.team.logo} />
                </Link>
                <FlexBoxColumn sx={{ alignContent: 'center', marginRight: 'auto' }}>
                    <TeamName textAlign={'left'} >
                        {props.team.team_name}
                    </TeamName>
                    <TeamWinLoss textAlign={'left'}>
                        {props.team.wins} - {props.team.losses}
                    </TeamWinLoss>
                </FlexBoxColumn>
            </FlexBoxRow>
        );
    }
}

/**
 * Used to create the custom time display at the top left of every bet
 * @param {*} props must include hour, minute, and period within an object called time
 * @returns A styled custom time component
 */
export function TimeBox(props) {
    return (
        <FlexBoxRow sx={{ width: '10%', flexShrink: 0, minWidth: '84px' }} >
            <Typography fontFamily='Lemon-Milk-Bold' fontSize='32px' >
                {props.time.hour}
            </Typography>
            <Typography fontFamily='Lemon-Milk-Bold' py='7px'>
                {props.time.min} {props.time.period}
            </Typography>
        </FlexBoxRow>
    );
}

/**
 * The bet button show inside every bet box
 * @param {*} props must include team1 and team2 objects
 * @returns A Styled BetButton
 */
export function BetButton(props) {
    if (props.expanded) {
        return (
            <FlexBoxRow width='10%'>
                <BetButtonStyleExpanded
                    onClick={() => {
                        props.selectBet(
                            props.team1, props.team2
                        )
                    }}
                >
                    Bet
                </BetButtonStyleExpanded>
            </FlexBoxRow>
        );
    } else {
        return (
            <FlexBoxRow width='10%' >
                <BetButtonStyle
                    sx={{ my: 'auto' }}
                    onClick={() => {
                        props.selectBet(
                            props.team1, props.team2
                        )
                    }}
                >
                    Bet
                </BetButtonStyle>
            </FlexBoxRow>
        );
    }
}

/**
 * Shown in bet detail view to show the difference between bets placed on team1 vs team2
 * @param {*} props must include Team1Percent of bets placed
 * @returns A coloured bar sperated by percentage of bets per team
 */
export function BetComparisonBar(props) {
  
    return (
        <FlexBoxRow width='100%' height={26}>
            <FlexBoxRow 
                backgroundColor='#900A22' 
                width={props.team1Percent + '%'}
                sx={{
                    borderTopLeftRadius: '25px', 
                    borderBottomLeftRadius: '25px', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                <TypographyLight fontSize={14}>
                    {props.team1Percent}
                </TypographyLight>
            </FlexBoxRow>
            <FlexBoxRow 
                backgroundColor='#445BC1' 
                flexGrow={1} 
                sx={{
                    borderTopRightRadius: '25px', 
                    borderBottomRightRadius: '25px', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                <TypographyLight fontSize={14}>
                    {100 - props.team1Percent}
                </TypographyLight>
            </FlexBoxRow>
        </FlexBoxRow>
    );

}