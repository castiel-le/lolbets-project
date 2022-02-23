/* eslint-disable camelcase */
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
        this.state = {
            team: {
                team_id: null,
                team_name: "",
                logo: "",
                abbreviation: "",
                wins: null,
                losses: null,
            },
            matches: [],
            page: 1,
        };
        this.changePage = this.changePage.bind(this);
        this.setMatches = this.setMatches.bind(this);
    }

    /**
     * Changes the page state, and the matches based on the new page.
     * @param {Number} page page number
     */
    async changePage(page) {
        try {
            const newMatches = await this.getMatches(page)
            this.setState({ page: page, matches: newMatches })
        } catch (e) {
            console.log("no matches for page " + page);
        }
    }

    /**
     * Fetches match data on specified page from API.
     * @param {Number} page - page number
     */
    async getMatches(page) {
    // urls to fetch
        const urlHistory = "/api/teams/history/";

        // fetch data
        const responseMatches = await fetch(urlHistory + this.props.params.id + "?page=" + page);

        if (responseMatches.ok) {
            return await responseMatches.json();
        } else {
            throw new Error("No match found for page " + page);
        }
    }

    /**
   * Sets Team's matches state to new matches based on page number
   * @param {Number} page page number 
   */
    async setMatches(page) {
        try {
            this.setState({matches: await this.getMatches(page)});
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Fetches team information.
     */
    async componentDidMount() {
    // urls to fetch
        const urlTeam = "/api/teams/";
        try {
            // fetch data
            const responseTeam = await fetch(urlTeam + this.props.params.id);

            if (responseTeam.ok) {
                this.setState({ team: await responseTeam.json()});
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box display="flex" flexDirection="row" columnGap={2}>
                    <TeamSection team={this.state.team} />
                    <MatchHistory matches={this.state.matches} id={this.state.team.team_id}
                        changePage={this.changePage}
                        page={this.state.page}
                        setMatches={this.setMatches} />
                </Box>
            </ThemeProvider>
        );
    }
}
export default withRouter(Team);