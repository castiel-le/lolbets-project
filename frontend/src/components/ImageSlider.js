import { Component } from 'react';
import { Link } from "react-router-dom";
import { SliderData } from './SliderData';
import { Box, Avatar } from '@mui/material';
import { FlexBoxColumn, FlexBoxRow, TypographyBold } from './customUIComponents';


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
            <FlexBoxRow sx={{mx: 'auto', justifyContent: 'center'}}>

                {this.state.teams.map((team, index) => {
                    
                    return  (
                        <Link to={"/teams/" + team.team_id} key={team.team_id}>
                            <Box sx={{transition: 'transform .1s ease-in-out', ':hover': { backgroundColor: '#917526', transform: 'scale(1.1)'}, backgroundColor: SliderData[index].bgcolor, width: "100%", height: '10em', display: 'flex'}} >
                                <FlexBoxColumn sx={{my: 'auto'}}>
                                    <Avatar src={team.logo} alt={team.abbreviation} style={{ height: '100px', width: '100px' }} />
                                    <TypographyBold fontSize={14} sx={{mx: 'auto', p: 3, color: SliderData[index].color}}>{team.abbreviation}</TypographyBold>
                                </FlexBoxColumn>
                            </Box>
                        </Link>
                    );
                })}

            </FlexBoxRow>
        )
    }
}