/* eslint-disable max-len */
import { Component } from "react";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from "@mui/material";
import customUIComponents, { FlexBoxColumn, FlexBoxRow, HorizontalDivider, TypographyBold, TypographyLight, TypographyMedium } from "../customUIComponents";

class Leaderboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        // eslint-disable-next-line camelcase
        user_id: null,
        username: "",
        // eslint-disable-next-line camelcase
        date_created: null,
        coins: 0
      },
      page: 1
    }
  }

  render(){
    return (
      <FlexBoxColumn width="80%" sx={{mx:'auto', alignItems: 'center'}}>
        <FlexBoxRow>
          <TypographyBold sx={{mx:'auto'}}>Leaderboard</TypographyBold>
        </FlexBoxRow>
        {/* 1st rank */}
        <FlexBoxRow sx={{ width: '100%', height:'100px' }} style={{backgroundColor: 'grey', borderRadius: '5px', padding: '10px', margin: '10px 0', width: '60%'}}>
          <FlexBoxRow>
            <FlexBoxColumn sx={{ width: '50%', mx: 'auto', alignItems: 'center', borderRadius: '10px'}} style={{backgroundColor: 'rgba(255, 155, 0, 0.3)'}}>
              <TypographyMedium sx={{ my:'auto', color: '#ff9b00', fontSize: '40px', borderBottom: '2px #ff9b00 solid', width: '40%'}}>1</TypographyMedium>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto' }}>Profile icon</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto' }}>Username, coins</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxRow>
        <FlexBoxRow sx={{ width:'100%', mx:'auto', margin: '10px 0', justifyContent: 'space-between', padding: '10px', backgroundColor: 'grey', borderRadius: '5px', height: '80px'}}>
          {/* 2nd rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue'}}>
              <TypographyLight sx={{ my: 'auto'}}>2</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Username2</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Coins2</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          {/* 3rd rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue'}}>
              <TypographyLight sx={{ my: 'auto'}}>3</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Username3</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Coins3</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          {/* 4th rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue'}}>
              <TypographyLight sx={{ my: 'auto' }}>4</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Username4</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Coins4</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          {/* 5th rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue'}}>
              <TypographyLight sx={{ my: 'auto' }}>5</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Username5</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>Coins5</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxRow>
      </FlexBoxColumn>
    );
  }
}

export default Leaderboard;