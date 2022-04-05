import { Fragment } from "react";
import { styled, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { TypographyLight, TypographyMedium, FlexBoxColumn, FlexBoxRow } from "../customUIComponents";

/**
 * Style used for the team names in bet view
 */
export const TeamName = styled(TypographyMedium)({
    margin: 'auto 24px',
    fontSize: '20px'
});

/**
 * Team win loss ratio displayed in bet view
 */
export const TeamWinLoss = styled(TypographyLight)({
    margin: '10px 30px',
    fontSize: '14px'
})

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
 * Used to create a team flex box with all the team info
 * @param {*} props props needs a team json with team_name, wins, losses, and logo inside
 * @returns A Box with all the styled team Elements
 */
export function TeamBox({left, team}) {
    if (left) {
        return (
            <FlexBoxRow width='40%' sx={{ alignItems: 'center' }}>
                <FlexBoxColumn sx={{ alignContent: 'center', marginLeft: 'auto' }}>
                    <TeamName textAlign={'right'} >
                        {team.team_name}
                    </TeamName>
                    <TeamWinLoss textAlign={'right'} >
                        {team.wins} - {team.losses}
                    </TeamWinLoss>
                </FlexBoxColumn>
                <Link to={`/teams/${team.team_id}`}>
                    <TeamLogo my='auto' src={team.logo} />
                </Link>
            </FlexBoxRow>
        );
    } else {
        return (
            <FlexBoxRow width='40%' sx={{ alignItems: 'center' }}>
                <Link to={`/teams/${team.team_id}`}>
                    <TeamLogo my='auto' src={team.logo} />
                </Link>
                <FlexBoxColumn sx={{ alignContent: 'center', marginRight: 'auto' }}>
                    <TeamName textAlign={'left'} >
                        {team.team_name}
                    </TeamName>
                    <TeamWinLoss textAlign={'left'}>
                        {team.wins} - {team.losses}
                    </TeamWinLoss>
                </FlexBoxColumn>
            </FlexBoxRow>
        );
    }
}

export default function TeamVSTeamLogos({team1, team2}) {

    return (
        <Fragment>
            <TeamBox left={true} team={team1} />

            <TypographyLight
                fontSize='14px'
                mx='32px'
                textAlign={'center'}
                my='auto'
                sx={{ display: 'flex', width: '2%', justifyContent: 'center' }}
            >
                VS
            </TypographyLight>

            <TeamBox left={false} team={team2} />
        </Fragment>
    );
}