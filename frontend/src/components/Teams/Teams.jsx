import { Component } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Grid, CardMedia, Card, CardContent, Button } from "@mui/material";
import TeamCard from "./Card/TeamCard";
const theme = createTheme();

/**
 * Component for displaying Team page where it contains
 * a specific team's information
 */
export default class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {teams: []};
    }

    async componentDidMount() {
      // url
      const url = "/api/teams";

      try {
        // fetch from url
        const response = await fetch(url);

        if (response.ok) {
          this.setState({teams: await response.json()});
        }
      } catch(e) {
        console.log(e);
      }
    }

    render() {
        //Styling
        return (
            <ThemeProvider theme={theme}>
                <Container>
                <Typography variant="h4" component="h2">All Teams</Typography>
                    <Grid container spacing={4}>
                    {this.state.teams.map((team) => (
                        <Grid item xs={12} sm={6} md={4} key={team.team_id}>
                            <TeamCard team={team} />
                        </Grid>
                    ))}
                        {/* {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))} */}
                    </Grid>
                </Container>
            </ThemeProvider>
        );
    }
}