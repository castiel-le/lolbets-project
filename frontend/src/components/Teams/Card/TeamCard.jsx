import { Component } from "react";
import { Typography, CardMedia, Card, CardContent } from "@mui/material";

export default class TeamCard extends Component {
    render() {
        // styling
        const stylingCard = { height: '100%', display: 'flex', flexDirection: 'column' };

        const teamPage = "/teams/" + this.props.team.team_id; //team's team page url
        return (
            <a href={teamPage}>
                <Card sx={stylingCard}>
                    <CardMedia
                        width={300}
                        height={300}
                        component="img"
                        image={this.props.team.logo}
                        loading="lazy"
                        alt="no logo" />

                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2">
                            {this.props.team.team_name}
                        </Typography>
                    </CardContent>
                </Card>
            </a>
        );
    }
}