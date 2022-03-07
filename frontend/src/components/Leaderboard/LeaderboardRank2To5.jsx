/* eslint-disable max-len */
import { Component } from "react";
import { FlexBoxColumn, FlexBoxRow, TypographyLight, TypographyMedium } from "../customUIComponents";
import poro from "./images/poro.png"
import DiamondIcon from "@mui/icons-material/Diamond"

class LeaderboardRank2To5 extends Component {
    
    render(){
        //styling
        const cardContainerStyle = {width: '20%', backgroundColor: '#444bc7', padding: '0 5px 5px 5px', borderRadius: '5px', alignItems: 'center', height: '91%'};
        const rankIconNameStyle = {borderRadius: '5px', padding: '5px', width: '100%', alignItems: 'center'};
        const rankStyle = {backgroundColor: 'rgba(31, 52, 166, 0.41)', height: '100%', px: '8px', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'lightblue', width: '20%'};
        const iconStyle = {height: '30px', width: '30px', margin: '0 5px', border: '1.5px gold solid', borderRadius: '5px'};
        const usernameStyle = {backgroundColor: 'rgba(31, 52, 166, 0.41)', width: '80%', textAlign: 'left', my:'auto', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: '1px', padding: '4px', color: 'lightblue', borderRadius: '5px'};
        const lossesBar = {width: '100%', backgroundColor: 'rgb(238, 90, 82)', height: '10px', borderRadius: '5px'};
        const winsBar = {width: '70%', backgroundColor: 'rgb(61, 149, 229)', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px'};

        return (
            // eslint-disable-next-line max-len
            <FlexBoxColumn style={cardContainerStyle}>
                <FlexBoxRow style={rankIconNameStyle}>
                    <TypographyMedium style={rankStyle}>{this.props.rank}</TypographyMedium>
                    <img src={poro} style={iconStyle}/>
                    <TypographyLight style={usernameStyle}>{this.props.user.username}</TypographyLight>
                </FlexBoxRow>
                <FlexBoxRow sx={{ padding: '5px'}}>
                    <TypographyLight sx={{ my: 'auto', textAlign: 'left', pr: '3px'}}>{this.props.user.coins}</TypographyLight>
                    <DiamondIcon sx={{ fontSize: '1rem', my: 'auto', color: 'lightblue', pr: '10px'}}/>
                    <TypographyLight sx={{ padding: '0 10px' }}>10W - 3L</TypographyLight>
                    <TypographyLight sx={{ pl: '10px' }}>77%</TypographyLight>
                </FlexBoxRow>
                <FlexBoxRow style={lossesBar}>
                    <FlexBoxRow style={winsBar} />
                </FlexBoxRow>
            </FlexBoxColumn>
        );
    }
}

export default LeaderboardRank2To5;