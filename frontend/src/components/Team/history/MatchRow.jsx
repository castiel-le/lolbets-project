import { Component } from "react";
import { TableRow, TableCell, Box } from "@mui/material";
import { TypographyBold, TypographyLight, FlexBoxRow, FlexBoxColumn } from "../../customUIComponents";

/**
 * Component for displaying a row in MatchHistory.
 */
export default class MatchRow extends Component {
    render() {
        const result = this.props.column.winner_id === this.props.id
            ? "Win"
            : !this.props.column.winner_id
                ? "Ongoing"
                : "Lose";
        // Styling
        const textColor = "#d1cdc7";
        const styleInfo = { color: textColor };
        const styleCell = {borderBottom: 0};
        const resultColor = this.props.column.winner_id === this.props.id ?
            "#04ff04" 
            : !this.props.column.winner_id ?
                "inherit" : "red";

        const team1IsCurrent = this.props.column.team1_id.team_id === this.props.id;
        

        let currentTeamAbbreviation = "";
        let currentTeamLogo = "";
        let opponentAbbreviation = "";
        let opponentLogo = ""

        // Initialize current team and opponent variables' values
        if (team1IsCurrent) {
            currentTeamAbbreviation = this.props.column.team1_id.abbreviation;
            currentTeamLogo = this.props.column.team1_id.logo;
            opponentAbbreviation = this.props.column.team2_id.abbreviation;
            opponentLogo = this.props.column.team2_id.logo;
        } else {
            currentTeamAbbreviation = this.props.column.team2_id.abbreviation;
            currentTeamLogo = this.props.column.team2_id.logo;
            opponentAbbreviation = this.props.column.team1_id.abbreviation;
            opponentLogo = this.props.column.team1_id.logo; 
        }
        
        return (
            <TableRow style ={ this.props.changeBackground ? { background : "rgb(36, 53, 64)" } : { background : "inherit" }}>
                <TableCell align="center" style={styleCell}>
                    <TypographyBold sx={{color: resultColor}}>
                        {result}
                    </TypographyBold>
                </TableCell>
                <TableCell align="center" style={{borderBottom: 0, marginLeft: 1}}>
                    <FlexBoxRow width="100%">
                        <FlexBoxColumn width="40%" alignItems="center" justifyContent="center">
                            <img src={currentTeamLogo}
                                alt="logo" width={30} height={30} loading="lazy" />
                            <TypographyLight style={styleInfo}>
                                {currentTeamAbbreviation}
                            </TypographyLight>   
                        </FlexBoxColumn>
                        <FlexBoxColumn width="20%" alignItems="center" justifyContent="center">
                            <TypographyLight style={styleInfo}>VS</TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxColumn width="40%" alignItems="center" justifyContent="center">
                            <img src={opponentLogo}
                                alt="logo" width={30} height={30} loading="lazy" />
                            <TypographyLight style={styleInfo}>
                                {opponentAbbreviation}
                            </TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                </TableCell>
                <TableCell style={styleCell}>
                    <TypographyLight style={styleInfo} align="center">
                        {new Date(this.props.column.match_start_time).toDateString()}
                    </TypographyLight>
                </TableCell> 
            </TableRow>
        );
    }
}