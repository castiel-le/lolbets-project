/* eslint-disable max-len */
import { Component } from "react";
import { FlexBoxColumn, FlexBoxRow, TypographyLight } from "../customUIComponents";
import poro from "./images/poro.png"

class LeaderboardRank2To5 extends Component {
    
    render(){
        return (
            // eslint-disable-next-line max-len
            <FlexBoxColumn sx={{ width: '20%', backgroundColor: 'rgba(31, 52, 166, 0.63)', padding: '10px', borderRadius: '5px', alignItems: 'center'}}>
                <FlexBoxRow sx={{ borderRadius: '5px', padding: '5px', height: '100%', width: '100%', alignItems: 'center'}}>
                    <TypographyLight sx={{ backgroundColor: 'black', height: '100%', px: '8px', borderRadius: '5px'}}>{this.props.rank}</TypographyLight>
                    <img src={poro} style={{height: '30px', width: '30px', margin: '0 5px', border: '1.5px gold solid', borderRadius: '5px' }}/>
                    <TypographyLight sx={{ width: '80%', height: '100%', textAlign: 'left', my:'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{this.props.user.username}</TypographyLight>
                </FlexBoxRow>
                <FlexBoxRow>
                    <TypographyLight sx={{ my: 'auto'}}>{this.props.user.coins}</TypographyLight>
                </FlexBoxRow>
            </FlexBoxColumn>
        );
    }
}

export default LeaderboardRank2To5;