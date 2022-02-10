import { Component } from "react";
import { Container, Typography } from "@mui/material";


/**
 * Component for displaying Team page where it contains
 * a specific team's information
 */
export default class TeamSection extends Component {
    constructor(props) {
        super(props);
        this.state = {team: null};
    }
    render() {
        return(
            <Container component="main" maxWidth="xs">
                    <Typography>Test</Typography>
            </Container>
        );
    }
}