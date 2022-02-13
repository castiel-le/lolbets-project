import { Component } from "react";
import { Grid, Avatar, Typography, Container } from "@mui/material";


/**
 * Component for displaying Team's information.
 */
export default class TeamSection extends Component {
    render() {
        return(
            <Grid container style={{background: "gray"}} justifyContent="center">
                <Grid item xs={3} alignItems="center" justifyContent="center" direction="column">
                        <Avatar sx={{ width: 100, height: 100 }} />
                    </Grid>
                <Grid item xs={9}>
                        <Grid container spacing={1}>
                            <Grid item xs={2.5}>
                                <Typography varaint="p" align="left" style={{fontWeight: "bold"}}>Name:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography varaint="p" align="left">Cloud 9</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography varaint="p" align="left"style={{fontWeight: "bold"}}>Acronym:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography varaint="p" align="left">C9</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography varaint="p" align="left"style={{fontWeight: "bold"}}>Wins:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography varaint="p" align="left">20</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography varaint="p" align="left"style={{fontWeight: "bold"}}>Losses:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography varaint="p" align="left">9</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid> 
        );
    }
}