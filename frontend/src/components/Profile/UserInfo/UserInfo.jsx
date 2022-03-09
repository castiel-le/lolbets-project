import { Grid } from "@mui/material";
import { Component } from "react";
import { 
    FlexBoxRow,
    FlexBoxColumn, 
    TypographyLight, 
} from "../../customUIComponents";

/**
 * Contains user information in the user/profile page.
 */
export default class UserInfo extends Component {
    render() {
        // Get account age
        let accountAge = "";
        if (this.props.userInfo.date_created) {
            const creationDate = new Date(this.props.userInfo.date_created);
            accountAge = Math.round(
                /** 
                 * today's date minus user creation date
                 * divided by 1000 milliseconds * (60 minutes * 60 seconds) * 24 hours) 
                 * */
                (new Date().getTime()  - creationDate.getTime()) / 86400000);
        }
        return(
                   
            <FlexBoxRow justifyContent={'center'} width="45%" alignSelf="center">
                <FlexBoxColumn width='45%'>
                    <TypographyLight marginBottom='16px'>
        Account Age: {accountAge} days
                    </TypographyLight>
                    <TypographyLight marginTop='16px'>
        Overall Rank: {this.props.userInfo.rank}
                    </TypographyLight>
                </FlexBoxColumn>
                <FlexBoxRow width='10%' />
                <FlexBoxColumn width='45%'>
                    <TypographyLight marginBottom='16px'>
        Coins: {this.props.userInfo.coins}
                    </TypographyLight>
                    <TypographyLight marginTop='16px'>
        Bets Placed: {this.props.userInfo.bets_placed}
                    </TypographyLight>
                </FlexBoxColumn>
            </FlexBoxRow>           
        )
    }
}
