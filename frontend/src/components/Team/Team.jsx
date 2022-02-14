import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";
import TeamSection from "./details/TeamSection";
import MatchHistory from "./history/MatchHistory";
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
                <Box display="flex" flexDirection="row" columnGap={2} style={{backgroundColor: "#282c34"}}>
                    <TeamSection />
                    <MatchHistory />
                </Box>
            </ThemeProvider>
        );
    }
}