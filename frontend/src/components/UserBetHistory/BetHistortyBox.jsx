import { Fragment, Component } from "react";
import { Box } from "@mui/material";
import { TypographyMedium} from "../customUIComponents";

/**
 * Represents a box of user bet history
 */
export default class UserBetHistory extends Component {
    render() {
        return(
            <Box sx={{ bgcolor: '#343F46', width: '50%', mx: 'auto'}}>
                {this.props.bet.team_betted_on.team_id === this.props.bet.match.winner_id
                    ? <TypographyMedium sx={{color: "lightGreen"}} fontSize='20px' 
                        position='relative' right='40%' top='50px'> 
                        WIN 
                    </TypographyMedium>
                    : <TypographyMedium sx={{color: "red"}} fontSize='20px' 
                        position='relative' right='40%' top='50px'> 
                        LOSE 
                    </TypographyMedium>
                }
                <TypographyMedium position='relative' bottom='30px'>
                    <TypographyMedium marginTop='10px'>Cloud9</TypographyMedium>
                    <img src={this.props.bet.team_betted_on.logo} width='72px' height='72px'/>
                    <TypographyMedium>
                        {new Date(this.props.bet.creation_date).toDateString()}
                    </TypographyMedium>
                    <TypographyMedium position='relative' left='35%' bottom='85px'>
                                Bet Amount : <br/>{this.props.bet.amount_bet}
                    </TypographyMedium>
                </TypographyMedium>
                    
            </Box>
        );
    }
}
    
