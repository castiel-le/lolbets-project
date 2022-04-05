
import logo from '../../logo.svg';
import '../../App.css';
import ImageSlider from '../ImageSlider';
import DiamondIcon from "@mui/icons-material/Diamond";
import { Card, Button, CardContent, CardActions } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TypographyMedium, TypographyLight, FlexBoxRow, FlexBoxColumn } from '../customUIComponents';
import { SliderData } from '../SliderData';
import { Component } from 'react';
import { Link } from "react-router-dom";

export default class LandingPage extends Component {

    render() {
        return (

            <header className="App-header">

                <div className="svg-container">
                    <img src={logo} width="64" className="App-logo" alt="logo" />

                    <p id="desc">
                        League of Legends Bets
                    </p>

                    <ImageSlider slides={SliderData} />
                    <FlexBoxRow width='100%'>
                        <FlexBoxColumn width='33%' sx={{mx: 'auto', marginLeft:'150px'}}>        
                            <Card sx={{ maxWidth: 345, backgroundColor: '#1E2A32', marginTop: '50px' }}>
                                <CardContent>
                                    <TypographyMedium gutterBottom variant="h5" component="div" sx={{ color: '#917526' }}>
                                        Bets
                                    </TypographyMedium>
                                    <TypographyLight variant="body2" color="text.secondary">
                                        Check for upcoming matches and place your bets here!
                                    </TypographyLight>
                                </CardContent>
                                <CardActions sx={{}}>
                                    <Link to="/bets" style={{ marginLeft: "auto" }}>
                                        <Button size="large">To bets <ArrowRightIcon /></Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </FlexBoxColumn>

                        <FlexBoxColumn width='33%' sx={{mx: 'auto'}}>
                            <Card sx={{ maxWidth: 345, backgroundColor: '#1E2A32', marginTop: '50px' }}>
                                <CardContent>
                                    <TypographyMedium gutterBottom variant="h5" component="div" sx={{ color: '#917526' }}>
                                        Teams
                                    </TypographyMedium>
                                    <TypographyLight variant="body2" color="text.secondary">
                                        Check the stats of your favourite team here!
                                    </TypographyLight>
                                </CardContent>
                                <CardActions>
                                    <Link to="/teams" style={{ marginLeft: "auto" }}>
                                        <Button size="large">To teams <ArrowRightIcon /></Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </FlexBoxColumn>

                        <FlexBoxColumn width='33%' sx={{mx: 'auto'}}>
                            <Card sx={{ maxWidth: 345, maxHeight: 500, backgroundColor: '#1E2A32', marginTop: '50px' }}>
                                <CardContent>
                                    <TypographyMedium gutterBottom variant="h5" component="div" sx={{ color: '#917526' }}>
                                        Leaderboard
                                    </TypographyMedium>
                                    <TypographyLight variant="body2" color="text.secondary">
                                        Earn exclusive <DiamondIcon sx={{ fontSize: '1rem', my: 'auto', color: 'lightblue', pl: '3px' }} /> to climb the leaderboard!
                                    </TypographyLight>
                                </CardContent>
                                <CardActions>
                                    <Link to="/leaderboard" style={{ marginLeft: "auto" }}>
                                        <Button size="large">To leaderboard <ArrowRightIcon /></Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </FlexBoxColumn>
                    </FlexBoxRow>

                </div>
            </header >
        )
    }
}