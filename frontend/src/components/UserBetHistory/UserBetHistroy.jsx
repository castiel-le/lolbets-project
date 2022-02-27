import { Fragment, Component } from "react";
import { Box } from "@mui/material";
import { TypographyMedium} from "../customUIComponents";

export default class UserBetHistory extends Component {

    render() {

        return(
            <Fragment>
                <Box sx={{ bgcolor: '#343F46', width: '60%', mx: 'auto'}}>
           
                    <TypographyMedium fontSize='20px' position='relative' right='40%' top='50px'>
                        Win
                    </TypographyMedium>
                    <TypographyMedium position='relative' bottom='30px'>
                        <TypographyMedium marginTop='10px'>Cloud9</TypographyMedium>
                        <img src="https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png" width='72px' height='72px'/>
                        <TypographyMedium>January 28,2022</TypographyMedium>
                        <TypographyMedium position='relative' left='35%' bottom='85px'>
                                Total Winnings : 13
                        </TypographyMedium>
                    </TypographyMedium>
                    
                </Box>

                
                <Box sx={{ bgcolor: '#343F46', width: '60%',  mx: 'auto'}}>

                    <TypographyMedium fontSize='20px' position='relative' right='40%' top='50px'>
                        Loss
                    </TypographyMedium>
                    <TypographyMedium position='relative' bottom='30px'>
                        <TypographyMedium marginTop='10px'>TSM</TypographyMedium>
                        <img src="https://cdn.pandascore.co/images/team/image/387/team-solomid-bjjwknt9.png" width='72px' height='72px'/>
                        <TypographyMedium>January 29,2022</TypographyMedium>
                        <TypographyMedium position='relative' left='35%' bottom='85px'>
                                Total Lost : 10
                        </TypographyMedium>
                    </TypographyMedium>
                </Box>
            </Fragment>
        );
    }
}