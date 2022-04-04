import React, { Component } from 'react'
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
                    
                    return (<Box key={team.logo} sx={{ backgroundColor: SliderData[index].color, ':hover': { backgroundColor: '#917526' }, height: '300px', width: '150px' }}>
                        <img src={team.logo} alt='team-image' className='image' style={{ marginTop: '80px' }} />

                    </Box>)

                })}

            </section>
        )
    }
}