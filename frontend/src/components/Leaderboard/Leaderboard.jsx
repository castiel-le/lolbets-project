/* eslint-disable max-len */
import { Component } from "react";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, TablePagination} from "@mui/material";
import { Android, Icecream } from '@mui/icons-material';
import customUIComponents, { FlexBoxColumn, FlexBoxRow, HorizontalDivider, TypographyBold, TypographyLight, TypographyMedium } from "../customUIComponents";

class Leaderboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      top5: [],
      remaining: [],
      page: 1
    }
  }

  async componentDidMount(){
    const urlTop5 = "/api/user/top5";
    const urlRest = "/api/user/rest";
    try {
      const top5 = await fetch(urlTop5);
      const remaining = await fetch(urlRest);
      if (top5.ok && remaining.ok){
        this.setState({
          top5: await top5.json(),
          remaining: await remaining.json()
        });
      }
    // eslint-disable-next-line brace-style
    }
    catch (e){
      console.error(e);
    }
  }

  render(){
    // eslint-disable-next-line no-extra-parens
    return this.state.top5.length !== 0 ? (
      <FlexBoxColumn width="80%" sx={{mx:'auto', alignItems: 'center'}}>
        <FlexBoxRow>
          <TypographyBold sx={{mx:'auto'}}>Leaderboard</TypographyBold>
        </FlexBoxRow>
        {/* 1st rank */}
        <FlexBoxRow sx={{ width: '100%', height:'100px'}} style={{backgroundColor: 'grey', borderRadius: '5px', padding: '10px', margin: '10px 0', width: '60%'}}>
          <FlexBoxRow>
            <FlexBoxColumn sx={{ width: '75px', mr: '10px', alignItems: 'center', borderRadius: '10px'}} style={{backgroundColor: 'rgba(255, 155, 0, 0.3)'}}>
              <TypographyMedium sx={{ my:'auto', color: '#ff9b00', fontSize: '40px', borderBottom: '2px #ff9b00 solid', width: '40%'}}>1</TypographyMedium>
            </FlexBoxColumn>
            <FlexBoxColumn sx={{ my: 'auto', transform: 'scale(3)', mx: '20px', color: 'white'}}>
              <Icecream sx={{ mx: 'auto' }}/>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[0].username}</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my:'auto', ml: '10px'}}>{this.state.top5[0].coins}</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxRow>
        <FlexBoxRow sx={{ width:'100%', mx:'auto', margin: '10px 0', justifyContent: 'space-between', padding: '10px', backgroundColor: 'grey', borderRadius: '5px', height: '80px'}}>
          {/* 2nd rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
              <TypographyLight sx={{ my: 'auto'}}>2</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[1].username}</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[1].coins}</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          {/* 3rd rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
              <TypographyLight sx={{ my: 'auto'}}>3</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[2].username}</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[2].coins}</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          {/* 4th rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
              <TypographyLight sx={{ my: 'auto' }}>4</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[3].username}</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[3].coins}</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
          {/* 5th rank */}
          <FlexBoxRow sx={{ display: 'flex', width: '20%', backgroundColor: '#5c5749', padding: '10px', borderRadius: '5px'}}>
            <FlexBoxColumn sx={{ width: '15%', backgroundColor: 'blue', borderRadius: '5px'}}>
              <TypographyLight sx={{ my: 'auto' }}>5</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[4].username}</TypographyLight>
            </FlexBoxColumn>
            <FlexBoxColumn>
              <TypographyLight sx={{ my: 'auto', mx: '10px'}}>{this.state.top5[4].coins}</TypographyLight>
            </FlexBoxColumn>
          </FlexBoxRow>
        </FlexBoxRow>

        {/* Table for ranks 6+ */}
        <TableContainer sx= {{ width: '80%'}} style={{ backgroundColor: 'grey', borderRadius: '5px', padding: '10px', margin: '10px'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ align: 'center', width: '30%' }}>
                  <TypographyLight>Rank</TypographyLight>
                </TableCell>
                <TableCell>
                  <TypographyLight>Username</TypographyLight>
                </TableCell>
                <TableCell>
                  <TypographyLight>Coins</TypographyLight>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.remaining.map((testerrr, index) =>
                  <TableRow key={testerrr.username}>
                    <TableCell sx={{ width:'30%' }}>
                      <TypographyLight>{index + 6}</TypographyLight>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <Android sx={{ color: 'white' }}/>
                        <TypographyLight sx={{ pl: '40px' }}>{testerrr.username}</TypographyLight>
                      </Box>  
                    </TableCell>
                    <TableCell>
                      <TypographyLight>{testerrr.coins}</TypographyLight>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </FlexBoxColumn>
    ) : <CircularProgress />;
  }
}

export default Leaderboard;