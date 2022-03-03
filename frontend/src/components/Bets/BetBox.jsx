/* eslint-disable max-len */
import { Component, Fragment } from 'react';

import { Box, AccordionDetails, AccordionSummary } from '@mui/material';
import { getTeamObject, fetchTeamInfo } from './helperFunctions';
import { BetButton, BetAccordion, TimeBox, TeamBox } from './styledElements';
import BetDetails from './BetDetails';
import { FlexBoxRow, TypographyLight } from '../customUIComponents';

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
   */
    handleExpand(event) {
        if (event.target.tagName.toLowerCase() !== "button") {
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
                                sx={{ 
                                    display: 'flex',
                                    borderRadius: 2,
                                    ":hover": { backgroundColor: this.state.expanded ? 'inherit' : '#1E2A32', borderRadius: 1 } 
                                }}
                            >
                                <FlexBoxRow width='100%'>

                                    <TimeBox time={this.props.time} />

                                    <TeamBox left={true} team={this.props.team1} />

                                    <TypographyLight
                                        fontSize='14px'
                                        mx='32px'
                                        textAlign={'center'}
                                        my='auto'
                                        sx={{ display: 'flex', width: '2%', justifyContent: 'center' }}
                                    >
                                        VS
                                    </TypographyLight>
                                    
                                    <TeamBox left={false} team={this.props.team2} />

                                    <BetButton expanded={this.state.expanded} selectBet={this.props.selectBet} team1={this.props.team1} team2={this.props.team2} />

                                </FlexBoxRow>
                            </AccordionSummary>

                            <AccordionDetails>
                                <BetDetails 
                                    date={this.props.date} 
                                    team1={this.props.team1} 
                                    team2={this.props.team2}
                                />
                            </AccordionDetails>

                        </BetAccordion>
                    </Box>
                </Box>
            </Fragment >
        );
    }
}
