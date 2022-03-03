/* eslint-disable max-len */
import { Component } from 'react';

import { Grid } from '@mui/material';
import { TypographyMedium, FlexBoxColumn } from '../../customUIComponents';

export default class BetHistoryBox extends Component {
    render() {
        return (
            <Grid item xs={12} backgroundColor="#343f46" marginBottom={2.5}>
                <Grid container>
                    <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                        {this.props.bet.team_betted_on.team_id === this.props.bet.match.winner_id
                            ? <TypographyMedium align="center" sx={{color: "lightGreen"}}> WIN </TypographyMedium>
                            : <TypographyMedium align="center" sx={{color: "red"}}> LOSE </TypographyMedium>
                        }
                    </Grid>
                    <Grid item xs={8} display="flex" justifyContent="center" alignItems="center">
                        <FlexBoxColumn alignItems="center">
                            <TypographyMedium align="center" marginBottom={1}>
                                {this.props.bet.team_betted_on.abbreviation}
                            </TypographyMedium>
                            <img src={this.props.bet.team_betted_on.logo} 
                                width='72px' height='72px'/>
                            <TypographyMedium align="center" marginTop={1}>
                                {new Date(this.props.bet.creation_date).toDateString()}
                            </TypographyMedium>
                        </FlexBoxColumn>
                    </Grid>
                    <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                        <FlexBoxColumn alignItems="center">
                            <TypographyMedium align="center" marginBottom={1}> Bet Amount</TypographyMedium>
                            <TypographyMedium align="center" marginTop={1}>
                                {this.props.bet.amount_bet}
                            </TypographyMedium>
                        </FlexBoxColumn>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
