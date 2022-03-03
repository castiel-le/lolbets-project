/* eslint-disable max-len */
import { Component } from "react";
import { FlexBoxColumn, FlexBoxRow, TypographyLight, TypographyMedium } from "../customUIComponents";
import poro from "./images/poro.png"

class LeaderboardRank2To5 extends Component {
    
    render(){
        return (
            // eslint-disable-next-line max-len
            <FlexBoxColumn sx={{ width: '20%', backgroundColor: 'rgba(31, 52, 166, 0.34)', padding: '10px', borderRadius: '5px', alignItems: 'center'}}>
                <FlexBoxRow sx={{ borderRadius: '5px', padding: '5px', height: '100%', width: '100%', alignItems: 'center'}}>
                    <TypographyMedium sx={{ backgroundColor: 'rgba(31, 52, 166, 0.41)', height: '100%', px: '8px', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'lightblue'}}>{this.props.rank}</TypographyMedium>
                    <img src={poro} style={{height: '30px', width: '30px', margin: '0 5px', border: '1.5px gold solid', borderRadius: '5px' }}/>
                    <TypographyLight sx={{ backgroundColor: 'rgba(31, 52, 166, 0.41)', width: '80%', textAlign: 'left', my:'auto', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: '1px', padding: '4px', color: 'lightblue', borderRadius: '5px'}}>{this.props.user.username}</TypographyLight>
                </FlexBoxRow>
                <FlexBoxRow>
                    <TypographyLight sx={{ my: 'auto'}}>{this.props.user.coins}</TypographyLight>
                </FlexBoxRow>
            </FlexBoxColumn>
        );
    }
}

export default LeaderboardRank2To5;