import { Component } from "react";
import {Link} from "react-router-dom";
import { Typography, CardMedia, Card, CardContent } from "@mui/material";

export default class TeamCard extends Component {
  render() {
    // styling
    const stylingCard = { height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 10};
    
    // team's team page url
    const teamPage = "/teams/" + this.props.team.team_id; 
    return (
      <Link to={teamPage}>
        <Card sx={stylingCard}>
          <CardMedia
            component="img"
            width={400}
            height={350}
            image={this.props.team.logo}
            loading="lazy"
            alt="no logo" />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h2">
              {this.props.team.team_name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }
}