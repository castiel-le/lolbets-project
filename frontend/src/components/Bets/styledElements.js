import { styled } from '@mui/system';
import { Box, Button, Accordion, Typography, Avatar} from '@mui/material';
import { FlexBoxRow, FlexBoxColumn, TypographyLight } from '../customUIComponents';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

export const BetAccordion = styled(Accordion)({
    flexGrow: 1,
    backgroundColor: '#223039',
    color: '#f9f9f9'
});

export const DateText = styled(Typography)({
    fontFamily: 'Lemon-Milk-Bold',
    fontSize: "24px",
    color: "#f9f9f9",
    display: "flex",
    flexDirection: "row",
    margin: 'inherit auto'
});

export const TeamLogo = styled(Avatar)({ 
    height: '72px',
    width: '72px',
    ':hover': {
        cursor: 'help'
    }
});

export const TeamName = styled(Typography)({
    fontFamily: 'Lemon-Milk-Medium',
    margin: 'auto 24px',
    fontSize: '20px'
});

export const TeamWinLoss = styled(Typography)({
    fontFamily: 'Lemon-Milk-Light',
    margin: '10px 30px',
    fontSize: '14px'
})

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

export const BetButtonStyleExpanded = styled(BetButtonStyle)({
    margin: 'inherit, 0px',
    backgroundColor: '#f9f9f9',
    color: '#111111',
    ":hover": {
        backgroundColor: 'gray',
    }
});

export const CustomCountdown = styled(Countdown)({
    fontFamily: 'Lemon-Milk-Bold',
    fontSize: 24
})

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

export function BetButton(props) {
    if (props.expanded) {
        return (
            <FlexBoxRow width='10%'>
                <BetButtonStyleExpanded
                    onClick={() =>
                        props.selectBet(
                            { team1: this.state.team1, team2: this.state.team2 },
                            this.state.team1, this.state.team2
                        )
                    }
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
                    onClick={() =>
                        props.selectBet(
                            { team1: this.state.team1, team2: this.state.team2 },
                            this.state.team1, this.state.team2
                        )
                    }
                >
                    Bet
                </BetButtonStyle>
            </FlexBoxRow>
        );
    }
}

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

export function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                color: (theme) => theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
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
