import { Component } from "react";
import { TableRow, TableCell, Typography, Box, Grid } from "@mui/material";
/**
 * Component for displaying a row in MatchHistory.
 */
export default class MatchRow extends Component {
    render() {
        // Styling
        const textColor = "#d1cdc7";
        const styleInfo = { color: textColor };
        const styleCell = {borderBottom: 0};
        const styleRow = this.props.column.winner_id === this.props.id ?
            {borderColor: "darkGreen" }
            : this.props.column.winner_id === null ?
                {border: 0} : {borderColor: "darkRed" };

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
            <TableRow>
                <TableCell align="center" style={styleCell}>
                    <Typography variant="p" style={styleInfo}>
                        {new Date(this.props.column.match_start_time).toLocaleString()}
                    </Typography>
                </TableCell>
                <TableCell align="center" sx={styleRow}>
                    <Grid container >
                        <Grid item xs={2.25}>
                            {/*padding*/}
                        </Grid>
                        <Grid item xs={1.5} justifyContent="flex-start" display="flex">
                            <img src={currentTeamLogo}
                                alt="logo" width={30} height={30} loading="lazy" />
                        </Grid>
                        <Grid item xs={1.5} justifyContent="flex-start" display="flex">
                            <Typography variant="p" style={styleInfo}>
                                {currentTeamAbbreviation}
                            </Typography>                        </Grid>
                        <Grid item xs={1.5} justifyContent="flex-start" display="flex">
                            <Typography variant="p" style={styleInfo}>VS</Typography>
                        </Grid>
                        <Grid item xs={1.5} justifyContent="flex-start" display="flex">
                            <Typography variant="p" style={styleInfo}>
                                {opponentAbbreviation}
                            </Typography>
                        </Grid>
                        <Grid item xs={1.5} justifyContent="flex-start" display="flex">
                            <img src={opponentLogo}
                                alt="logo" width={30} height={30} loading="lazy" />
                        </Grid>
                        
                        
                    
                    </Grid>
                </TableCell>
            </TableRow>
        );
    }
}