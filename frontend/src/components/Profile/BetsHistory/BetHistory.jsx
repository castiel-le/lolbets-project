import { Component } from 'react';
import { Grid, Button, Box } from '@mui/material';
import BetHistoryBox from "./BetHistoryBox";
import { Link } from 'react-router-dom';
import { TypographyMedium, TypographyLight } from "../../customUIComponents";
export default class AllBets extends Component {
    render() {
        return(
            <Box width='82%' alignSelf="center"> 
                <TypographyMedium variant="h4" marginTop={1} marginBottom={1}>
                    Recent Bets
                </TypographyMedium>
                <Grid container>
                    {this.props.bets.map(bet => 
                        <BetHistoryBox bet={bet} key={bet.bet_participant_id} />
                    )}

                </Grid >
                {this.props.bets.length === 0
                    ? <TypographyLight variant="h4" marginTop={1} marginBottom={1}
                        style={{opacity: "50%"}}>
                        No Bets Found
                    </TypographyLight>
                    :
                    
                    <Button variant="contained" align="center"
                        component={Link} to="/user/1/history">
                            View Full History
                    </Button>
                }
            </Box>
        );
    }
}