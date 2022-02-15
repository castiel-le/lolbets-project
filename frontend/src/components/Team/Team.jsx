import { Component } from "react";
import withRouter from "../../config/withRouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography } from "@mui/material";
import TeamSection from "./details/TeamSection";
import MatchHistory from "./history/MatchHistory";
const theme = createTheme();

/**
 * Component for displaying Team page where it contains
 * a specific team's information
 */
class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {team: {
            team_id: null,
            team_name: "",
            logo: "",
            abbreviation: "",
            wins: null,
            losses: null,
        }, matches: []};
        
    }
    async componentDidMount(){
        // urls to fetch
        const urlTeam = "/api/teams/";
        const urlHistory = "/api/teams/history/";
        
        // fetch data
        const responseTeam = await fetch(urlTeam + this.props.params.id);
        const responseMatches = await fetch(urlHistory + this.props.params.id);
        this.setState({team: await responseTeam.json(), matches: await responseMatches.json()});
    }
    render() {
        return(
            <ThemeProvider theme={theme}>
                <Box display="flex" flexDirection="row" columnGap={2} style={{backgroundColor: "#1e2021"}}>
                    <TeamSection team={this.state.team} />
                    <MatchHistory />
                </Box>
            </ThemeProvider>
        );
    }
}
export default withRouter(Team);