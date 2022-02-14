import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";
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
                <Box display="flex" flexDirection="row" justifyContent="center" columnGap={1}>
                    <TeamSection />
                    <Box width={800} border={1}><Typography>Match here</Typography></Box>
                </Box>
            </ThemeProvider>
        );
    }
}