import { FormControl, InputLabel, Select, MenuItem, Avatar, List, ListItemButton, TextField, Divider, ThemeProvider, Tooltip} from '@mui/material';
import {Component} from 'react';
import { FlexBoxColumn, FlexBoxRow, TypographyLight, TypographyBold, HorizontalDivider} from '../../customUIComponents';
import { SnackbarContext } from '../../Snackbar/SnackbarContext';
import ConfirmationBox from '../../ReusedComponents/ConfirmationBox';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme } from '@mui/material';
import CustomDialog from '../../ReusedComponents/CustomDialog/CustomDialog';
import Payout from './Payout';

const theme = createTheme({
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: "rgba(0,100,100, 0.2)",
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(0,100,100, 0.6)',
                        ':hover' : {
                            backgroundColor: 'rgba(0,100,100, 0.2)',
                        }
                    }
                },
            }
        },
        // Name of the component
        MuiListItemButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    "&:hover": {
                        backgroundColor: "rgba(0,100,100, 0.2)",
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(0,100,100, 0.6)',
                        ':hover' : {
                            backgroundColor: 'rgba(0,100,100, 0.2)',
                        }
                    }
                },
            },
        },
    }
});

export default class CreateBetPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateIndex: '',
            matchIndex: '',
            categoryIndex: '',
            minutes: ['x'],
            openConfirmation: false,
        }
        this.cancel = this.cancel.bind(this);
        this.confirmSubmit = this.confirmSubmit.bind(this);
        this.submit = this.submit.bind(this);
        this.getConfirmationMessage = this.getConfirmationMessage.bind(this);
        this.cancelSubmit = this.cancelSubmit.bind(this);
        this.checkAllOptionsSelected = this.checkAllOptionsSelected.bind(this);
    }

    /**
     * Called when the user clicks away from the popup
     * Or when the user clicks the cancel button
     * Resets all states and hides the popup
     */
    cancel() {
        this.setState({
            dateIndex: '',
            matchIndex: '',
            categoryIndex: '',
            minutes: [5],
        });
        this.props.closeCreateBet();
    }

    /**
     * Used to create a message for the confirmation box
     * @returns The correct confrimation box message
     */
    getConfirmationMessage() {
        if (this.state.dateIndex === '' || this.state.matchIndex === '') {
            return '';
        }
        const dateString = new Date(this.props.dates[this.state.dateIndex][0].match_start_time).toDateString();
        const team1 = this.props.dates[this.state.dateIndex][this.state.matchIndex].team1_id.team_name;
        const team2 = this.props.dates[this.state.dateIndex][this.state.matchIndex].team2_id.team_name;
        return (
            `Create Bet for ${team1} against ${team2} on ${dateString}?`
        );
    }

    /**
     * Called when the user clicks the submit button
     */
    confirmSubmit() {
        if (this.checkAllOptionsSelected()) {
            this.setState({
                openConfirmation: true,
            });
        }
    }

    /**
     * Called when the user clicks no in the confirmation box
     */
    cancelSubmit() {
        this.setState({
            openConfirmation: false
        });
    }

    /**
     * Called when the user confirms the creation of the bet
     */
    async submit() {
        const url = "/api/custombets";
        const data = {
            creator_id: this.props.user.id,
            category_id: this.props.categories[this.state.categoryIndex].category_id,
            match_id: this.props.dates[this.state.dateIndex][this.state.matchIndex].match_id,
            win_conditions: this.state.minutes
        }
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            this.setState({
                openConfirmation: false,
                dateIndex: '',
                matchIndex: '',
                categoryIndex: '',
                minutes: ['x'],
            },
            () => this.context.setSnackbar(true, 'Bet Created', 'success')
            );
            this.props.closeCreateBet();
        } else {
            this.setState({
                openConfirmation: false,
            },
            () => this.context.setSnackbar(true, 'Something went wrong', 'error')
            );
            
        }
    }

    /**
     * Checks to see that all required information is defined
     * @returns returns true if the user input all valid options
     */
    checkAllOptionsSelected() {
        let message = '';
        if (this.state.dateIndex === '') {
            message = 'Select a date';
        } else if (this.state.matchIndex === '') {
            message = 'Select a match';
        } else if (this.state.categoryIndex === '') {
            message = 'Select a category';
        } else if (this.state.minutes[0] < 5) {
            message = 'Cannot bet under 5 minutes';
        } else if (this.state.minutes[0] > 90) {
            message = 'Cannot bet over 90 minutes';
        } else if (this.state.minutes.length === 2 && this.state.minutes[1] < this.state.minutes[0]) {
            message = 'Bet end time must be after bet start time';
        } else if (this.state.minutes[0] === 'x') {
            message = 'Enter minutes you want to bet on';
        }
        const showMessage = Boolean(message !== '');
        this.context.setSnackbar(showMessage, message, 'error');
        return !showMessage;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.categoryIndex !== this.state.categoryIndex) {
            if (this.state.categoryIndex === '') {
                this.setState({
                    minutes: ['x'],
                })
            } else if (this.state.categoryIndex !== 2) {
                this.setState({
                    minutes: [this.state.minutes[0]],
                })
            } else if (this.state.categoryIndex === 2) {
                this.setState({
                    minutes: [this.state.minutes[0], this.state.minutes[0]]
                })
            } 
        }
    }

    render () {
        return (
            <ThemeProvider theme={theme}>
                <CustomDialog 
                    open={this.props.open} 
                    onClose={() => this.cancel()} 
                    onSubmit={() => this.confirmSubmit()}
                    title={"Create Bet"}
                >

                    <FlexBoxRow width='500px' height='308px'>
                        <FlexBoxColumn width='60%'>
                            <FormControl fullWidth sx={{my: 1, height: '20%', width: '100%'}}>
                                <InputLabel>
                                    <TypographyLight>
                                        Date
                                    </TypographyLight>
                                </InputLabel>
                                <Select 
                                    className='customSelect'
                                    value={this.state.dateIndex}
                                    label="Date"
                                    onChange={(e) => this.setState({dateIndex: e.target.value})}
                                    sx={{height: '64px', backgroundColor: '#1E2A32'}}
                                    MenuProps={{
                                        PaperProps:{
                                            style: {
                                                backgroundColor: '#1E2A32',
                                                borderRadius: 4
                                            }
                                        },
                                        MenuListProps: {
                                            style: {
                                                backgroundColor: '#1E2A32',
                                                borderRadius: 4
                                            },
                                        }
                                    }}
                                >
                                    {this.props.dates.map((date, index) => {
                                        const readableDate = new Date(date[0].match_start_time).toDateString();
                                        return (
                                            <MenuItem key={readableDate} value={index} sx={{justifyContent: 'center'}}>
                                                <TypographyLight>
                                                    {readableDate}
                                                </TypographyLight>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <TypographyBold fontSize={12}>
                                    Select a Category
                            </TypographyBold>    
                            <HorizontalDivider width='82%%' />
                            <List sx={{height: '80%', backgroundColor: '#1E2A32', mt: 1, borderRadius: '4px', py: 0, 
                                border: '1px solid #171720', width: '100%'}}>
                                {this.props.categories.map((category, index) => {
                                    const cleanCategoryName = String(category.category_name).replace('Match', 'Finish');
                                    return (
                                        <ListItemButton
                                            key={index} 
                                            selected={this.state.categoryIndex === index} 
                                            onClick={() => this.setState({categoryIndex: index})}
                                            sx={{justifyContent: 'center', mx: 'auto', borderBottom: '1px solid rgb(0,100,100)', mt: '8px'}}
                                        >
                                            <TypographyLight>
                                                {cleanCategoryName} 
                                                {cleanCategoryName.includes('Between') ? ' Two times' : ` ${this.state.minutes[0]} minutes`}
                                            </TypographyLight>
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </FlexBoxColumn>
                        <FlexBoxColumn width='5%' >
                            <Divider variant="middle" orientation="vertical" color='rgba(0,100,100,1)' width='1px' sx={{mx: 'auto', height: '300px'}}/>
                        </FlexBoxColumn>
                        <FlexBoxColumn width='35%' sx={{height: '100%', maxHeight: '300px', alignContent: 'center', pt: 1}}>
                            {this.state.dateIndex !== ''
                                ? 
                                <List 
                                    sx={{
                                        overflow: 'auto', 
                                        backgroundColor: '#1E2A32',
                                        borderRadius: '4px', 
                                        border: '1px solid #171720',
                                        height: '300px'
                                    }}>
                                    {this.props.dates[this.state.dateIndex].map((match, index) => {
                                        return (
                                            <ListItemButton 
                                                key={match.match_id} 
                                                selected={this.state.matchIndex === index} 
                                                onClick={() => this.setState({matchIndex: index})}
                                                sx={{justifyContent: 'center', '&focus' : {backgroundColor: 'green'}}}
                                            >
                                                <FlexBoxRow  sx={{justifyContent: 'right'}}>
                                                    <Avatar src={match.team1_id.logo} alt={match.team1_id.team_name} />
                                                    <TypographyLight sx={{my: 'auto', mx: '10px'}}>
                                                        vs
                                                    </TypographyLight>
                                                    <Avatar src={match.team2_id.logo} alt={match.team2_id.team_name} />
                                                </FlexBoxRow>
                                            </ListItemButton>
                                        );
                                    })} 
                                </List>
                                : 
                                <TypographyLight sx={{color: "#e2e5de", height: '300px', alignItems: 'center', py: '100px', px:2, backgroundColor: '#1E2A32', borderRadius: '4px', border: '1px solid #171720'}}>
                                    Select a Date to view upcoming matches
                                </TypographyLight>
                            }
                        </FlexBoxColumn>
                    </FlexBoxRow>
                    <FlexBoxRow sx={{height: '70px', my: 'auto'}}>
                        <FlexBoxRow width='60%' sx={{m: 'auto', justifyContent: 'center', maxHeight: '60px', my: 'auto'}}>
                            {this.state.categoryIndex !== '' && this.state.minutes.map((mins, index) => {
                                if (this.state.categoryIndex === '') {
                                    return;
                                }
                                const cleanCategoryName = String(this.props.categories[this.state.categoryIndex].category_name).split(' ');
                                const between = ['Start', 'End']
                                return (
                                    <FlexBoxColumn key={index}>
                                        <TypographyBold fontSize={12}>
                                            {cleanCategoryName[1] === 'Between' ? between[index] : cleanCategoryName[1]}
                                        </TypographyBold>
                                        <FlexBoxRow>
                                            <TypographyBold fontSize={12} sx={{mt: 'auto', mx: 1}}>
                                                    Minutes:
                                            </TypographyBold>
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                value={this.state.minutes[index]}
                                                required
                                                sx={{
                                                    input: {
                                                        color: '#f9f9f9', 
                                                        backgroundColor: '#1E2A32',
                                                        textAlign: 'center',
                                                        width: '50px'
                                                    }
                                                }}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                
                                                onChange={(event) => {
                                                    let value = event.target.value;
                                                    if (value < 0) {
                                                        value = 0;
                                                    } else if (value > 90) {
                                                        value = 90;
                                                    }
                                                    let newMinutes = [];
                                                    if (this.state.minutes.length === 1) {
                                                        newMinutes = [value];
                                                    } else if (this.state.minutes.length === 2 && index === 0) {
                                                        newMinutes = [value, this.state.minutes[1]];
                                                    } else if (this.state.minutes.length === 2 && index === 1) {
                                                        newMinutes = [this.state.minutes[0], value];
                                                    }
                                                    this.setState({
                                                        minutes: newMinutes
                                                    });
                                                }}
                                            />
                                        </FlexBoxRow>
                                    </FlexBoxColumn>
                                );
                            }
                            )}
                            {this.state.categoryIndex !== '' &&
                                <Tooltip title={
                                    <TypographyLight>
                                            Time Bets must be at least 5 minutes and no greater than 90 minutes
                                    </TypographyLight>
                                }>
                                    <InfoIcon sx={{color: '#f5f5f5', fontSize: 14}}/>
                                </Tooltip>
                            }
                        </FlexBoxRow>
                        <FlexBoxRow width='5%' />
                        <Payout minutes={this.state.minutes} categoryIndex={this.state.categoryIndex}/>
                    </FlexBoxRow>
                </CustomDialog>

                <ConfirmationBox
                    open={this.state.openConfirmation} 
                    selectNo={this.cancelSubmit}
                    selectYes={this.submit}
                    confirmationMessage={this.getConfirmationMessage()}
                />
            </ThemeProvider>
        );
    }
}

CreateBetPopup.contextType = SnackbarContext;