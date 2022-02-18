import { Avatar, ButtonGroup, Paper, Button, Typography, TabPanelUnstyled, Collapse } from "@mui/material";
import { Component, Fragment } from "react";
import { FlexBoxColumn, FlexBoxRow, HorizontalDivider } from "../Bets/styledElements";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export default class Profile extends Component {

  render() {
    return (
      <Fragment >
        <FlexBoxColumn width='82%' mx='auto'>
          <Paper variant="outlined">
            <img 
              src="https://img.rankedboost.com/wp-content/uploads/2016/06/League-of-Legends-Profile-Banner-Trim-Season-Rewards.png" 
            />
          </Paper>
          <Avatar 
            src="https://images.gnwcdn.com/2021/articles/2021-11-04-22-11/league-of-legends-jinx-joins-fortnite-ahead-of-netflixs-animated-tv-series-1636063903187.jpg/EG11/thumbnail/732x412/format/jpg/quality/50" 
            sx={{width: '256px', height: '256px', mx: 'auto', transform: 'translateY(-128px)'}}
          />
          <FlexBoxRow >
            <FlexBoxRow width='50%' sx={{borderColor: '#f9f9f9', borderWidth: '5px'}}>
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
              <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
            </FlexBoxRow>
            <FlexBoxRow width='256px' />
            <FlexBoxRow width='50%' sx={{justifyContent:'flex-end'}}>
              <ButtonGroup >
                <Button variant='contained' startIcon={<BookmarkAddIcon />} sx={{backgroundColor: '#c79a43'}}>
                  <Typography fontFamily='Lemon-Milk-Light' >
                    Bookmark
                  </Typography>
                </Button>
                <Button variant='contained' startIcon={<AddReactionIcon />} sx={{backgroundColor: 'rgb(0,100,100)'}}>
                  <Typography fontFamily='Lemon-Milk-Light' >
                    Add Friend
                  </Typography>
                </Button>
              </ButtonGroup>
            </FlexBoxRow>
          </FlexBoxRow>
          <FlexBoxRow justifyContent={'center'}>
            <Typography fontFamily={'Lemon=Milk-Light'} color="#f9f9f9" >
                  Username
            </Typography>
          </FlexBoxRow>
          <FlexBoxRow justifyContent={'center'}>
            <FlexBoxColumn >
              <Typography fontFamily={'Lemon=Milk-Light'} >
                    Account Age:
              </Typography>
              <Typography fontFamily={'Lemon=Milk-Light'} >
                    Overall Rank:
              </Typography>
            </FlexBoxColumn>
            <FlexBoxColumn >
              <Typography fontFamily={'Lemon=Milk-Light'} >
                    Bets Placed:
              </Typography>
              <Typography fontFamily={'Lemon=Milk-Light'} >
                    Bets Won: 
              </Typography>
            </FlexBoxColumn>
          </FlexBoxRow>
          <FlexBoxRow justifyContent={'center'}>
            <Typography >
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