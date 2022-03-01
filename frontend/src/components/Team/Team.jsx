/* eslint-disable camelcase */
import { Component } from "react";
import withRouter from "../withRouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import TeamSection from "./details/TeamSection";
import MatchHistory from "./history/MatchHistory";
import { Loading } from '../customUIComponents';

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
            teamNotLoaded: true,
            matchNotLoaded: true,
            matches: [],
            page: 1,
            rowsPerPage: 15
        };
        this.changePage = this.changePage.bind(this);
        this.setMatches = this.setMatches.bind(this);
        this.changeMatchNotLoaded = this.changeMatchNotLoaded.bind(this);
    }

    /**
     * Changes the matchNotLoaded state to value
     * @param {Boolean} value matchNotLoaded's new value
     */
    changeMatchNotLoaded(value) {
        this.setState({matchNotLoaded: value})
    }

    /**
     * Changes the page state, and the matches based on the new page.
     * @param {Number} page page number
     */
    async changePage(page) {
        const tablePage = page - 1;
        // Check if new page exceeds current matches in the state
        if (tablePage * this.state.rowsPerPage < this.state.matches.length) {
            this.setState({page: page, matchNotLoaded: false});
        } else {
            // fetch new matches
            try {
                const newMatches = await this.getMatches(page);
                this.setState({ page: page, matches: this.state.matches.concat(newMatches), 
                    matchNotLoaded: false })
            } catch (e) {
                console.log("no matches for page " + page);
            }
        }
    }

    /**
     * Fetches match data on specified page from API.
     * @param {Number} page - page number
     * @returns array of matches(in json)
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
            this.setState({matches: await this.getMatches(page), matchNotLoaded: false});
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
                this.setState({ team: await responseTeam.json(), teamNotLoaded: false});
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                
                {this.state.isTeamNotLoaded ?
                    <Loading />
                    :
                    <Box display="flex" flexDirection="row" columnGap={2}>
                        <TeamSection team={this.state.team} />
                        <MatchHistory matches={this.state.matches} id={this.state.team.team_id}
                            changePage={this.changePage}
                            page={this.state.page}
                            setMatches={this.setMatches}
                            rowsPerPage={this.state.rowsPerPage}
                            matchNotLoaded={this.state.matchNotLoaded}
                            changeMatchNotLoaded={this.changeMatchNotLoaded} />
                    </Box>
                }
                
            </ThemeProvider>
        );
    }
}
export default withRouter(Team);