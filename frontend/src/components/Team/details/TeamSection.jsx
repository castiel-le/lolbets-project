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
        const styleBody = {backgroundColor: "#282c34"};

        return(
            <Box display="flex" flexDirection="column" style={styleBody} alignSelf="flex-start">
                <Typography variant="h5" noWrap style={styleHeader}>Cloud9</Typography>
                    <img src="https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png" 
                        alt="logo" width={400} height={400}/>
                <Typography variant="h5" noWrap style={styleHeader}>Team Information</Typography>
                <Grid container columnSpacing={1}>
                    <Grid item xs={6} justifyContent="flex-end" display="flex">
                        <Typography variant="p1" noWrap style={styleLabel}>Abbreviation:</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" display="flex">
                        <Typography variant="p1" noWrap align="left" style={styleInfo}>C9</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-end" display="flex">
                        <Typography variant="p1" noWrap style={styleLabel}>Wins:</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" display="flex">
                        <Typography variant="p1" noWrap align="left" style={styleInfo}>13</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-end" display="flex">
                        <Typography variant="p1" noWrap style={styleLabel}>Losses:</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" display="flex">
                        <Typography variant="p1" noWrap align="left" style={styleInfo}>7</Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}