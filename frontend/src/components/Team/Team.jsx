import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";
import TeamSection from "./TeamSection";
const theme = createTheme();

/**
 * Component for displaying Team page where it contains
 * a specific team's information
 */
export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {team: null};
    }
    render() {
        return(
            <ThemeProvider theme={theme}>
                <Grid container spacing={1.5}>
                    <Grid item xs={5}>
                        <TeamSection />
                    </Grid>
                    <Grid item xs={7}>
                        <TeamSection />
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}