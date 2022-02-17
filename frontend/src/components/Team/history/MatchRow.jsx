import { Component } from "react";
import { TableRow, TableCell, Typography, Box } from "@mui/material";
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
            { backgroundColor: "darkGreen" }
            : this.props.column.winner_id != null ?
                { backgroundColor: "darkRed" } : {};
        return (
            <TableRow
                style={styleRow}>
                <TableCell align="center" style={styleCell}>
                    <Typography variant="p" style={styleInfo}>
                        {new Date(this.props.column.match_start_time).toLocaleString()}
                    </Typography>
                </TableCell>
                <TableCell align="center" style={styleCell}>
                    <Box display="flex" flexDirection="row" columnGap={1}
                        justifyContent="center" alignItems="center">
                        <img src={this.props.column.team1_id.logo}
                            alt="logo" width={30} height={30} loading="lazy" />
                        <Typography variant="p" style={styleInfo}>
                            {this.props.column.team1_id.abbreviation}
                        </Typography>
                        <Typography variant="p" style={styleInfo}>VS</Typography>
                        <Typography variant="p" style={styleInfo}>
                            {this.props.column.team2_id.abbreviation}
                        </Typography>
                        <img src={this.props.column.team2_id.logo}
                            alt="logo" width={30} height={30} loading="lazy" />
                    </Box>
                </TableCell>
            </TableRow>
        );
    }
}