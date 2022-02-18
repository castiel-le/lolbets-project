import { Avatar, ButtonGroup, Paper, Button, Typography, TabPanelUnstyled, Collapse } from "@mui/material";
import { Component, Fragment } from "react";
import { FlexBoxColumn, FlexBoxRow, HorizontalDivider } from "../Bets/styledElements";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

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
            <FlexBoxRow width='50%' my="24px" marginLeft='24px' sx={{borderColor: '#f9f9f9', borderWidth: '5px'}}>
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
            </FlexBoxRow>
            <Avatar 
              src="https://images.gnwcdn.com/2021/articles/2021-11-04-22-11/league-of-legends-jinx-joins-fortnite-ahead-of-netflixs-animated-tv-series-1636063903187.jpg/EG11/thumbnail/732x412/format/jpg/quality/50" 
              sx={{width: '256px', height: '256px', mx: 'auto', transform: 'translateY(-128px)'}}
            />
            <FlexBoxRow width='50%' my="auto" marginRight='24px' sx={{justifyContent:'flex-end'}}>
              <ButtonGroup sx={{height: '36px', }}>
                <Button variant='contained' startIcon={<BookmarkAddIcon />} sx={{backgroundColor: '#c79a43'}}>
                  <Typography fontFamily='Lemon-Milk-Light' >
                    Bookmark
                  </Typography>
                </Button>
                <Button variant='contained' startIcon={<AddReactionIcon />} sx={{backgroundColor: 'rgb(0,100,100)', ':hover': {backgroundColor: 'rgb(0,200,200)'}}}>
                  <Typography fontFamily='Lemon-Milk-Light' >
                    Add Friend
                  </Typography>
                </Button>
              </ButtonGroup>
            </FlexBoxRow>
          </FlexBoxRow>
          <FlexBoxColumn justifyContent={'center'} my='24px' width={'fit-content'} mx='auto'>
            <Typography fontFamily={'Lemon-Milk-Bold'} color="#f9f9f9" fontSize={'32px'}>
                  littlett98
            </Typography>
            <HorizontalDivider width='100%' />
          </FlexBoxColumn>
          <FlexBoxRow justifyContent={'center'} >
            <FlexBoxColumn width='45%'>
              <Typography fontFamily={'Lemon=Milk-Light'} marginBottom='16px' color='#f9f9f9'>
                    Account Age: 10 days
              </Typography>
              <Typography fontFamily={'Lemon=Milk-Light'} marginTop='16px' color='#f9f9f9'>
                    Overall Rank: 1001
              </Typography>
            </FlexBoxColumn>
            <FlexBoxRow width='10%' />
            <FlexBoxColumn width='45%'>
              <Typography fontFamily={'Lemon=Milk-Light'} marginBottom='16px' color='#f9f9f9'>
                    Bets Placed: 12
              </Typography>
              <Typography fontFamily={'Lemon=Milk-Light'} marginTop='16px' color='#f9f9f9'>
                    Bets Won: 2
              </Typography>
            </FlexBoxColumn>
          </FlexBoxRow>
          <FlexBoxRow justifyContent={'center'} my='16px'>
            <Typography fontFamily={'Lemon-Milk-Medium'} fontSize='24px' color='#f9f9f9'>
                Bet History
            </Typography>
          </FlexBoxRow>
          <HorizontalDivider width='100%' />
          <h1>History stuff</h1>
        </FlexBoxColumn>
      </Fragment>
    );
  }
}