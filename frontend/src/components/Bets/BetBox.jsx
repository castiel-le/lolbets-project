/* eslint-disable max-len */
import { Component, Fragment } from 'react';

import { Box, AccordionDetails, AccordionSummary } from '@mui/material';
import { getTeamObject, fetchTeamInfo } from './helperFunctions';
import { BetAccordion, TimeBox, TeamBox } from './styledElements';
import BetButton from './BetCreation/BetButton';
import BetDetails from './BetDetails';
import { FlexBoxRow, TypographyLight } from '../customUIComponents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import TeamVSTeamLogos from '../ReusedComponents/TeamVSTeamLogos';

export default class BetBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
        this.handleExpand = this.handleExpand.bind(this);
        this.fetchTeamDetails = this.fetchTeamDetails.bind(this);
    }

    async fetchTeamDetails() {
        let jsonTeam1 = await fetchTeamInfo(this.props.team1ID);
        let jsonTeam2 = await fetchTeamInfo(this.props.team2ID);

        this.setState({
            team1: getTeamObject(await jsonTeam1),
            team2: getTeamObject(await jsonTeam2)
        });
    }

    /**
   * Determines whether or not the bet should show details
   * If you click a button, or an icon inside a button, the accordion won't expand
   */
    handleExpand(event) {
        const tag = event.target.tagName.toLowerCase();
        if ( tag !== 'button' && tag !== 'path' && tag !== 'svg') {
            this.setState({
                expanded: !this.state.expanded
            })
        }
    }

    render() {
        return (
            <Fragment >
                {/* Parent box holds everything within a center box with width 82% of whole window */}
                <Box
                    sx={{ bgcolor: 'inherit', width: '82%', mx: 'auto' }}
                >
                    <Box sx={{p: 1, m: 1, flexGrow: 1, my: '0px', bgcolor: 'inherit', border: '0px' }}>
                        <BetAccordion 
                            expanded={this.state.expanded} 
                            onChange={(event) => this.handleExpand(event)} 
                        >
                            <AccordionSummary
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                expandIcon={<ExpandMoreIcon sx={{color: grey[400]}}/>}
                                sx={{ 
                                    borderRadius: 2,
                                    ":hover": { backgroundColor: this.state.expanded ? 'inherit' : '#1E2A32', borderRadius: 1 },
                                }}
                            >
                                <FlexBoxRow width='100%'>
                                    <FlexBoxRow width='24px' />

                                    <TimeBox time={this.props.time} />

                                    <TeamVSTeamLogos team1={this.props.team1} team2={this.props.team2} />

                                    <BetButton 
                                        expanded={this.state.expanded} 
                                        selectBet={this.props.selectBet}
                                        delete={this.props.deleteBetParticipant}
                                        betID={this.props.betID} 
                                        team1={this.props.team1} 
                                        team2={this.props.team2} 
                                        existingBet={this.props.existingBet}
                                    />

                                </FlexBoxRow>
                            </AccordionSummary>

                            <AccordionDetails>
                                <BetDetails 
                                    date={this.props.date} 
                                    team1={this.props.team1} 
                                    team2={this.props.team2}
                                    totalBet={this.props.totalBet}
                                    team1Bet={this.props.team1Bet}
                                />
                            </AccordionDetails>

                        </BetAccordion>
                    </Box>
                </Box>
            </Fragment >
        );
    }
}
