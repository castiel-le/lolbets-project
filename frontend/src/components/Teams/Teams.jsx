import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Grid } from "@mui/material";
import TeamCard from "./Card/TeamCard";
import DynamicAutoSearchBar from "./Search/DynamicAutoSearchBar";
const theme = createTheme();

/**
 * Component for displaying Team page where it contains
 * a specific team's information
 */
export default class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = { teams: [], filterName: "" };
        this.onSearch = this.onSearch.bind(this);
    }

    /**
   * Fetches teams from API
   */
    async componentDidMount() {
    // url
        const url = "/api/teams";

        try {
            // fetch from url
            const response = await fetch(url);

            if (response.ok) {
                this.setState({ teams: await response.json() });
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
   * Sets Team's filterName state to search name.
   * @param {String} searchedName 
   */
    onSearch(searchedName) {
        this.setState({filterName: searchedName});
    }

    render() {
    //Styling
        const textColor = "#d1cdc7";
        const styleLabel = {fontWeight: "bold", color: textColor, marginBottom: 1};
    
        return (
            <ThemeProvider theme={theme}>
                <Container>     
                    <Typography variant="h4" component="h2" style={styleLabel}>All Teams</Typography>
                    <DynamicAutoSearchBar onSearch={this.onSearch} teams={this.state.teams} />
                    <Grid container spacing={4} marginTop={2}>
                        {this.state.teams.filter(team => team.team_name.toLowerCase().
                            includes(this.state.filterName.toLowerCase())).
                            map((team) =>
                                <Grid item xs={12} sm={6} md={4} key={team.team_id}>
                                    <TeamCard team={team} />
                                </Grid>
                            )}
                    </Grid>
                </Container>
            </ThemeProvider>
        );
    }
}