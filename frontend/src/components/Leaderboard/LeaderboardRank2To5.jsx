/* eslint-disable max-len */
import { Component } from "react";
import { FlexBoxColumn, FlexBoxRow, TypographyLight, TypographyMedium } from "../customUIComponents";
import poro2 from './images/poro2.png';
import DiamondIcon from "@mui/icons-material/Diamond";
import {Link} from "react-router-dom";
import minorStyling from './minorStyling.css';

/**
 * Component used for the cards of players rank 2-5
 */
class LeaderboardRank2To5 extends Component {
    
    render(){
        //Set up the current player's win rate bar display
        let playerWinRate = 0;
        let playerWins = this.props.user.wins;
        let playerLosses = this.props.user.losses;
        
        if (playerWins + playerLosses !== 0){
            playerWinRate = Math.round(playerWins / (playerWins + playerLosses) * 10000) / 100;
        }
        //Styling
        const cardContainerStyle = {width: '20%', backgroundColor: '#444bc7', padding: '0 5px 5px 5px', borderRadius: '5px', alignItems: 'center', height: '91%'};
        const rankIconNameStyle = {borderRadius: '5px', padding: '5px', width: '100%', alignItems: 'center'};
        const rankStyle = {backgroundColor: 'rgba(31, 52, 166, 0.41)', height: '100%', px: '8px', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'lightblue', width: '20%'};
        const iconStyle = {height: '30px', width: '30px', margin: '0 5px', border: '1.5px gold solid', borderRadius: '5px'};
        const usernameStyle = {backgroundColor: 'rgba(31, 52, 166, 0.41)', width: '80%', textAlign: 'left', my:'auto', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: '1px', padding: '4px', color: 'lightblue', borderRadius: '5px'};
        const lossesBar = {width: '100%', backgroundColor: 'rgb(238, 90, 82)', height: '10px', borderRadius: '5px'};
        const winsBar = {width: `${playerWinRate}%`, backgroundColor: 'rgb(61, 149, 229)', borderRadius: '5px'};

        return (
            <FlexBoxColumn style={cardContainerStyle}>
                <FlexBoxRow style={rankIconNameStyle}>
                    <TypographyMedium style={rankStyle}>{this.props.rank}</TypographyMedium>
                    <img src={poro2} style={iconStyle}/>
                    <Link to={`/user/${this.props.user.user_id}`} style={usernameStyle}>
                        <TypographyLight noWrap>{this.props.user.username}</TypographyLight>
                    </Link>
                </FlexBoxRow>
                <FlexBoxRow sx={{ padding: '5px'}}>
                    <TypographyLight sx={{ my: 'auto', textAlign: 'left', pr: '3px'}}>{this.props.user.coins}</TypographyLight>
                    <DiamondIcon sx={{ fontSize: '1rem', my: 'auto', color: 'lightblue', pr: '10px'}}/>
                    <TypographyLight sx={{ padding: '0 10px' }}>{playerWins}W - {playerLosses}L</TypographyLight>
                    <TypographyLight sx={{ pl: '10px' }}>{playerWinRate}%</TypographyLight>
                </FlexBoxRow>
                <FlexBoxRow style={lossesBar}>
                    <FlexBoxRow style={winsBar} />
                </FlexBoxRow>
            </FlexBoxColumn>
        );
    }
}

export default LeaderboardRank2To5;