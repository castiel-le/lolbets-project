import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { SliderData } from './SliderData';
import { Box } from '@mui/material';


export default class ImageSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

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
            console.log("Cannot get teams");
        }
    }

    render() {

        return (
            <section className='slider'>

                {this.state.teams.map((team, index) => {
                    
                    return  <Link to={"/teams/" + team.team_id} key={team.team_id}
                        style={{ height: '300px', width: '150px' }}>
                        <Box sx={{':hover': { backgroundColor: '#917526'}, 
                            backgroundColor: SliderData[index].color, width: "100%", height: "100%"}}>
                            <img src={team.logo} alt='team-image' className='image' style={{ marginTop: '80px' }} />
                        </Box>
                    </Link>

                })}

            </section>
        )
    }
}