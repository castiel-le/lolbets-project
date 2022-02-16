import { Component } from "react";
import { Container, Typography, Grid, CardMedia, Card, CardContent, Button } from "@mui/material";

export default class TeamCard extends Component {
    render() {
        // styling
        const stylingCard = { height: '100%', display: 'flex', flexDirection: 'column' };

        return (
            <a href="/teams/1">
                <Card sx={stylingCard}>
                    <CardMedia
                        width={200}
                        height={200}
                        component="img"
                        image={this.props.team.logo}
                        loading="lazy"
                        alt="logo" />

                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2">
                            {this.props.team.name}
                        </Typography>
                    </CardContent>
                </Card>
            </a>
        );
    }
}