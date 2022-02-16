import { Component } from "react";
import withRouter from "../withRouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
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
        try {
            // fetch data
            const responseTeam = await fetch(urlTeam + this.props.params.id);
            const responseMatches = await fetch(urlHistory + this.props.params.id);

            if(responseMatches.ok && responseTeam.ok) {
                this.setState({team: await responseTeam.json(), matches: await responseMatches.json()});
            }
        } catch(e) {
            console.log(e);
        }
    }
    render() {
        return(
            <ThemeProvider theme={theme}>
                <Box display="flex" flexDirection="row" columnGap={2} style={{backgroundColor: "#1e2021"}}>
                    <TeamSection team={this.state.team} />
                    <MatchHistory matches={this.state.matches} id={this.state.team.team_id}/>
                </Box>
            </ThemeProvider>
        );
    }
}
export default withRouter(Team);