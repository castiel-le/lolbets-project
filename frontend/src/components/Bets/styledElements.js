import { styled } from '@mui/system';
import { Button, Accordion, Typography} from '@mui/material';
import { FlexBoxRow, TypographyLight } from '../customUIComponents';

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
 * Shown in bet detail view to show the difference between bets placed on team1 vs team2
 * @param {*} props must include Team1Percent of bets placed
 * @returns A coloured bar sperated by percentage of bets per team
 */
export function BetComparisonBar(props) {
  
    return (
        <FlexBoxRow width='100%' height={26} sx={{visibility: props.visibility ? "visible" : "hidden"}}>
            <FlexBoxRow 
                backgroundColor='#900A22' 
                width={props.team1Percent !== 0 ? props.team1Percent + '%' : "auto"}
                sx={{
                    borderTopLeftRadius: '25px', 
                    borderBottomLeftRadius: '25px', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                <TypographyLight fontSize={14}>
                    {props.team1Percent}%
                </TypographyLight>
            </FlexBoxRow>
            <FlexBoxRow 
                backgroundColor='#445BC1' 
                flexGrow={1} 
                width={props.team1Percent !== 100 ? 100 - props.team1Percent + '%' : "auto"}
                sx={{
                    borderTopRightRadius: '25px', 
                    borderBottomRightRadius: '25px', 
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <TypographyLight fontSize={14}>
                    {100 - props.team1Percent}%
                </TypographyLight>
            </FlexBoxRow>
        </FlexBoxRow>
    );

}