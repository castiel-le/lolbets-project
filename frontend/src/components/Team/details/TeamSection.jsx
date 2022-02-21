import { Component } from "react";
import { Box, Typography, Grid } from "@mui/material";


/**
 * Component for displaying Team's information.
 */
export default class TeamSection extends Component {
  render() {
    // Styling
    const textColor = "#d1cdc7";
    const styleHeader = {backgroundColor: "#6d530b", fontWeight: "bold", color: textColor};
    const styleLabel = {fontWeight: "bold", color: textColor};
    const styleInfo = {color: textColor}
    const styleBody = {backgroundColor: "#1e2a32"};

    return(
      <Box display="flex" flexDirection="column" style={styleBody} alignSelf="flex-start">
        <Typography variant="h5" noWrap style={styleHeader}>{this.props.team.team_name}</Typography>
        <img src={this.props.team.logo} 
          alt="logo" width={400} height={400} loading="lazy"/>
        <Typography variant="h5" noWrap style={styleHeader}>Team Information</Typography>
        <Grid container columnSpacing={1}>
          <Grid item xs={6} justifyContent="flex-end" display="flex">
            <Typography variant="p1" noWrap style={styleLabel}>Abbreviation:</Typography>
          </Grid>
          <Grid item xs={6} justifyContent="flex-start" display="flex">
            <Typography variant="p1" noWrap align="left" style={styleInfo}>
              {this.props.team.abbreviation}
            </Typography>
          </Grid>
          {/* <Grid item xs={6} justifyContent="flex-end" display="flex">
            <Typography variant="p1" noWrap style={styleLabel}>Wins:</Typography>
          </Grid>
          <Grid item xs={6} justifyContent="flex-start" display="flex">
            <Typography variant="p1" noWrap align="left" style={styleInfo}>
              {this.props.team.wins}
            </Typography>
          </Grid>
          <Grid item xs={6} justifyContent="flex-end" display="flex">
            <Typography variant="p1" noWrap style={styleLabel}>Losses:</Typography>
          </Grid>
          <Grid item xs={6} justifyContent="flex-start" display="flex">
            <Typography variant="p1" noWrap align="left" style={styleInfo}>
              {this.props.team.wins}
            </Typography>
          </Grid> */}
        </Grid>
      </Box>
    );
  }
}