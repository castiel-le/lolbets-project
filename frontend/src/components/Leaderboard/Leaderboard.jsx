/* eslint-disable max-len */
import { Component } from "react";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from "@mui/material";
import customUIComponents, { FlexBoxColumn, FlexBoxRow, TypographyBold, TypographyLight, TypographyMedium } from "../customUIComponents";

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
      <FlexBoxColumn width="90%" sx={{mx:'auto'}}>
        <FlexBoxRow>
          <TypographyBold sx={{mx:'auto'}}>Leaderboard</TypographyBold>
        </FlexBoxRow>
        <FlexBoxRow sx={{ display: 'flex', width: '60%', mx:'auto' }} style={{backgroundColor: 'grey', borderRadius: '5px', padding: '10px'}}>
          <FlexBoxRow>
            <FlexBoxColumn sx={{ width: '20%', mx: 'auto'}} style={{backgroundColor: 'rgba(255, 155, 0, 0.3)'}}>
              <TypographyMedium sx={{ my:'auto', color: '#ff9b00'}}>1</TypographyMedium>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight>Profile icon</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight>Username, coins</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxRow>
      </FlexBoxColumn>
    );
  }
}

export default Leaderboard;