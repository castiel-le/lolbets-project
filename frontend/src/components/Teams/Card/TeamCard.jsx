import { Component } from "react";
import {Link} from "react-router-dom";
import { CardMedia, Card, CardContent } from "@mui/material";
import { TypographyBold } from "../../customUIComponents";

export default class TeamCard extends Component {
    render() {
    // styling
        const stylingCard = { height: '100%', display: 'flex', 
            flexDirection: 'column', boxShadow: 10, 
            backgroundColor: "#334653",
            ":hover": { backgroundColor: "#465f71" }
        };
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
                        <TypographyBold variant="h5">
                            {this.props.team.team_name}
                        </TypographyBold>
                    </CardContent>
                </Card>
            </Link>
        );
    }
}