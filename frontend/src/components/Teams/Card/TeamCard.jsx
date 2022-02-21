import { Component } from "react";
import {Link} from "react-router-dom";
import { Typography, CardMedia, Card, CardContent } from "@mui/material";

export default class TeamCard extends Component {
    render() {
    // styling
        const stylingCard = { height: '100%', display: 'flex', 
            flexDirection: 'column', boxShadow: 10, 
            backgroundColor: "#223039",
            ":hover": { backgroundColor: "#1E2A32" }
        };
        const textColor = "#d1cdc7";
        const styleLabel = {fontWeight: "bold", color: textColor};
        const styleLink = {textDecoration: "none"};

        // team's team page url
        const teamPage = "/teams/" + this.props.team.team_id; 
        return (
            <Link to={teamPage} style={styleLink}>
                <Card sx={stylingCard}>
                    <CardMedia
                        component="img"
                        width={400}
                        height={350}
                        image={this.props.team.logo}
                        loading="lazy"
                        alt="no logo" />

                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2" style={styleLabel}>
                            {this.props.team.team_name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        );
    }
}