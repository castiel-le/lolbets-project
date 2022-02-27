import { Avatar, ButtonGroup, Paper, Button } from "@mui/material";
import { Component, Fragment } from "react";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {
    FlexBoxColumn,
    FlexBoxRow,
    TypographyBold,
    TypographyLight,
    TypographyMedium,
    HorizontalDivider
} from "../customUIComponents";

export default class Profile extends Component {

    render() {
        return (
            <Fragment >
                <FlexBoxColumn width='82%' mx='auto' backgroundColor='#1E2A32'>
                    <Paper variant="outlined">
                        <img
                            src="https://img.rankedboost.com/wp-content/uploads/2016/06/League-of-Legends-Profile-Banner-Trim-Season-Rewards.png"
                            height='256px'
                        />
                    </Paper>
                    <FlexBoxRow height='128px'>
                        <FlexBoxRow my="24px" marginLeft='24px' sx={{ borderColor: '#f9f9f9', borderWidth: '5px', display: { xs: 'none', md: 'inherit' }, width: { xs: '10%', md: '50%' } }}>
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                        </FlexBoxRow>
                        <Avatar
                            src="https://images.gnwcdn.com/2021/articles/2021-11-04-22-11/league-of-legends-jinx-joins-fortnite-ahead-of-netflixs-animated-tv-series-1636063903187.jpg/EG11/thumbnail/732x412/format/jpg/quality/50"
                            sx={{ width: '256px', height: '256px', mx: 'auto', transform: 'translate(1px, -128px)' }}
                        />
                        <FlexBoxRow my="auto" marginRight='24px' sx={{ justifyContent: 'flex-end', width: { xs: '10%', md: '50%' } }}>
                            <ButtonGroup sx={{ height: '36px' }}>

                                <Button variant='contained' startIcon={<BookmarkAddIcon />} sx={{ backgroundColor: '#c79a43', display: { xs: 'none', md: 'inherit' } }}>
                                    <TypographyLight >
                                        Bookmark
                                    </TypographyLight>
                                </Button>
                                <Button variant='contained' sx={{ backgroundColor: '#c79a43', display: { xs: 'inherit', md: 'none' } }}>
                                    <BookmarkAddIcon />
                                </Button>
                                <Button variant='contained' startIcon={<AddReactionIcon />} sx={{ backgroundColor: 'rgb(0,100,100)', ':hover': { backgroundColor: 'rgb(0,200,200)' }, display: { xs: 'none', md: 'inherit' } }}>
                                    <TypographyLight >
                                        Add Friend
                                    </TypographyLight>
                                </Button>
                                <Button variant='contained' sx={{ backgroundColor: 'rgb(0,100,100)', display: { xs: 'inherit', md: 'none' } }}>
                                    <AddReactionIcon />
                                </Button>
                            </ButtonGroup>
                        </FlexBoxRow>
                    </FlexBoxRow>
                    <FlexBoxColumn justifyContent={'center'} my='24px' width={'fit-content'} mx='auto'>
                        <TypographyBold fontSize='32px'>
                            littlett98
                        </TypographyBold>
                        <HorizontalDivider width='100%' />
                    </FlexBoxColumn>
                    <FlexBoxRow justifyContent={'center'} >
                        <FlexBoxColumn width='45%'>
                            <TypographyLight marginBottom='16px'>
                                Account Age: 10 days
                            </TypographyLight>
                            <TypographyLight marginTop='16px'>
                                Overall Rank: 1001
                            </TypographyLight>
                        </FlexBoxColumn>
                        <FlexBoxRow width='10%' />
                        <FlexBoxColumn width='45%'>
                            <TypographyLight marginBottom='16px'>
                                Bets Placed: 12
                            </TypographyLight>
                            <TypographyLight marginTop='16px'>
                                Bets Won: 2
                            </TypographyLight>
                        </FlexBoxColumn>
                    </FlexBoxRow>
                    <FlexBoxRow justifyContent={'center'} my='16px'>
                        <TypographyMedium fontSize='24px'>
                            Bet History
                        </TypographyMedium>
                    </FlexBoxRow>
                    <HorizontalDivider width='100%' />
                    <h1>History stuff</h1>
                </FlexBoxColumn>
            </Fragment>
        );
    }
}