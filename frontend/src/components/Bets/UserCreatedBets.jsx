import { ExpandMore, Square} from '@mui/icons-material';
import { Collapse, List, ListItem, Button, ListItemButton, TextField, ThemeProvider, createTheme } from '@mui/material';
import { Fragment, useEffect, useState, useContext } from 'react';
import { FlexBoxColumn, FlexBoxRow, TypographyMedium, TypographyLight, TypographyBold, Loading } from '../customUIComponents';
import CustomDialog from '../ReusedComponents/CustomDialog/CustomDialog';
import { LoginButton } from '../ReusedComponents/LoginButton';
import ConfirmationBox from '../ReusedComponents/ConfirmationBox';
import CreateBetButton from './BetCreation/CreateBetButton';
import CreateBetPopup from './BetCreation/CreateBetPopup';
import BetDetails from './BetDetails';
import { SnackbarContext } from '../Snackbar/SnackbarContext';
import Payout from './BetCreation/Payout';

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

const categoryColors = ['yellow', 'orange', 'red']

export default function UserCreatedBets({ user, upcomingMatchesByDate }) {

    const context = useContext(SnackbarContext);
    const [userBets, setUserBets] = useState([]);
    const [showCreateBet, setShowCreateBet] = useState(false);
    const [betToEdit, setBetToEdit] = useState();
    const [openLegend, setOpenLegend] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [betCategories, setBetCategories] = useState([]);
    const [categoryIndex, setCategoryIndex] = useState();
    const [minutes, setMinutes] = useState(['-', '-']);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (user.id === null) {
            return;
        }
        fetchCategories();
        if (await updateUserBets()) {
            setLoading(false);
        } else {
            context.setSnackbar(true, 'Unable to fetch user bets', 'error');
        }
    }, []);

    useEffect(() => {
        if (categoryIndex === 2) {
            setMinutes([minutes[0], minutes[1] ? minutes[1] : '-']);
        } else {
            setMinutes([minutes[0]]);
        }
    }, [categoryIndex]);

    async function fetchCategories() {
        const url = "/api/categories";
        const response = await fetch(url);
        if (!response.ok) {
            context.setSnackbar(true, 'Unable to fetch categories', 'error');
            return;
        }
        setBetCategories(await response.json());
    }

    async function updateUserBets() {
        const url = `/api/custombets/${user.id}`;
        const response = await fetch(url);
        if (response.ok) {
            setUserBets(await response.json());
            return true;
        }
        return false;
    }

    /**
     * Checks to see that all required information is defined
     * @returns returns true if the user input all valid options
     */
    function checkAllOptionsSelected() {
        let message = '';
        if (!parseInt(categoryIndex)) {
            message = 'Select a category';
        } else if (minutes[0] < 5) {
            message = 'Cannot bet under 5 minutes';
        } else if (minutes[0] > 90) {
            message = 'Cannot bet over 90 minutes';
        } else if (minutes.length === 2 && minutes[1] < minutes[0]) {
            message = 'Bet end time must be after bet start time';
        } else if (!parseInt(minutes[0])) {
            message = 'Enter minutes you want to bet on';
        }
        const showMessage = Boolean(message !== '');
        context.setSnackbar(showMessage, message, 'error');
        return !showMessage;
    }

    useEffect(async () => {
        await updateUserBets();
    }, [showCreateBet]);

    const editCustomBet = (index) => {
        setBetToEdit(userBets[index]);
        setCategoryIndex(userBets[index].category - 2);
        const mins = userBets[index].category < 4 ? [userBets[index].win_condition[0]] : userBets[index].win_condition;
        setMinutes(mins);
    }

    const deleteCustomBet = async (index) => {
        const url = "/api/custombets";
        const savedIndex = userBets[parseInt(index)].betInfo.bet_id;
        const data = {
            bet_id: userBets[parseInt(index)].betInfo.bet_id
        }

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            for (let i = 0; i < userBets.length; i++) {
                if (userBets[parseInt(i)].betInfo.bet_id === savedIndex) {
                    const betsToCheck = userBets;
                    betsToCheck.splice(i, 1);
                    setUserBets(betsToCheck);
                    break;
                }
            }
            context.setSnackbar(true, 'Bet successfully deleted', 'info');
        } else {
            context.setSnackbar(true, 'An error occurred', 'error');
        }
    }

    const submitEdittedBet = async () => {
        const url = "/api/custombets";
        const data = {
            creator_id: user.id,
            // the offset is 2 in the db
            category_id: categoryIndex + 2,
            match_id: betToEdit.matchInfo.match_id,
            win_conditions: minutes
        }
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            context.setSnackbar(true, 'Bet edited successfully', 'success');
            setOpenConfirmation(false);
            setBetToEdit();
            setCategoryIndex();
            setMinutes([]);
            updateUserBets();
        } else {
            context.setSnackbar(true, 'An error occurred', 'error');
        }
    }

    // If user is not logged in, tell them to login
    if (user.id === null) {
        return (
            <FlexBoxColumn width='82%' sx={{ mx: 'auto', my: '12%', justifyContent: 'center' }}>
                <Fragment>
                    <TypographyMedium sx={{ mb: 4 }}>
                        Please Login to create a custom bet
                    </TypographyMedium>
                    <FlexBoxRow sx={{ justifyContent: 'center', mx: 'auto' }}>
                        <LoginButton />
                    </FlexBoxRow>
                </Fragment>
            </FlexBoxColumn>
        );
    } else if (user.id !== null && loading) {
        return (
            <Loading />
        );
    }

    const containerStyle = userBets.length === 0 ? {mx: 'auto', my: '12%', justifyContent: 'center'} : {mx: 'auto', mt: 2, justifyContent: 'center'}
    return (
        <Fragment>
            <FlexBoxColumn width='82%' sx={containerStyle}>
                {userBets.length === 0 &&
                    <Fragment>
                        <TypographyMedium sx={{ mb: 4 }}>
                            Looks like you do not have any custom bets
                        </TypographyMedium>
                    </Fragment>
                }
                {userBets.map((bet, index) => {
                    return (
                        <Fragment key={bet.betInfo.bet_id}>
                            <BetDetails
                                variant='custom'
                                date={new Date(bet.matchInfo.match_start_time).valueOf()}
                                team1={bet.matchInfo.team1_id}
                                team2={bet.matchInfo.team2_id}
                                payout={bet.payout}
                                categoryColor={categoryColors[bet.category - 2]}
                                editCustomBet={editCustomBet}
                                deleteCustomBet={deleteCustomBet}
                                index={index}
                            />
                        </Fragment>
                    );
                })}
                <FlexBoxRow width='200px' sx={{ justifyContent: 'center', mx: 'auto' }}>
                    <CreateBetButton createBet={() => setShowCreateBet(true)} />
                </FlexBoxRow>
            </FlexBoxColumn>

            <FlexBoxRow sx={{ position: 'absolute', left: '0px', top: '10em', backgroundColor: 'rgba(15,21,25, 0.8)', boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px' }}>
                <Collapse in={openLegend} collapsedSize={0} orientation='horizontal'>
                    <FlexBoxColumn>
                        <List>
                            {categoryColors.map((color, index) => {
                                return (
                                    <Fragment key={color}>
                                        <FlexBoxRow sx={{width: '100%'}}>
                                            <Square sx={{ color: `${color}`, my: 'auto', mx: 1 }} />
                                            <ListItem sx={{my: 'auto'}}>
                                                <TypographyBold fontSize={12} sx={{whiteSpace: 'nowrap'}}>
                                                    {betCategories[index] ? betCategories[index].category_name : null}
                                                </TypographyBold>
                                            </ListItem>
                                        </FlexBoxRow>
                                    </Fragment>
                                );
                            })}
                        </List>
                    </FlexBoxColumn>
                </Collapse>

                <FlexBoxColumn width={0} sx={{ my: 'auto' }}>
                    {openLegend
                        ?
                        <Button sx={{ p: 0, transform: 'rotate(90deg)', backgroundColor: 'rgba(0,100,100, 0.85)', ':hover': { backgroundColor: 'rgba(0,100,100,1)' } }} onClick={() => setOpenLegend(!openLegend)}>
                            <ExpandMore sx={{color: 'rgb(0,200,200)'}}/>
                        </Button>
                        :
                        <Button sx={{ p: 0, transform: 'rotate(-90deg)', backgroundColor: 'rgba(0,200,200, 0.85)', ':hover': { backgroundColor: 'rgba(0,100,100,1)' } }} onClick={() => setOpenLegend(!openLegend)}>
                            <ExpandMore sx={{color: 'rgb(17,21,25)'}}/>
                        </Button>
                    }
                </FlexBoxColumn>

            </FlexBoxRow>
            <CustomDialog
                open={Boolean(betToEdit)}
                onClose={() => setBetToEdit()}
                onSubmit={() => {
                    if (checkAllOptionsSelected()) {
                        setOpenConfirmation(true);
                    }
                }}
                title={'Edit Custom Bet'}
            >
                <FlexBoxRow>
                    <ThemeProvider theme={theme}>
                        <List sx={{
                            height: '80%', backgroundColor: '#1E2A32', mt: 1, borderRadius: '4px', py: 0,
                            border: '1px solid #171720'
                        }}>
                            {betCategories.map((category, index) => {
                                const cleanCategoryName = String(category.category_name).replace('Match', 'Finish');
                                return (
                                    <ListItemButton
                                        key={index}
                                        selected={categoryIndex === index}
                                        onClick={() => setCategoryIndex(index)}
                                        sx={{ justifyContent: 'center', mx: 'auto', borderBottom: '1px solid rgb(0,100,100)', mt: '8px' }}
                                    >
                                        <TypographyLight>
                                            {cleanCategoryName}
                                            {/* {cleanCategoryName.includes('Between') ? ' Two times' : ` ${this.state.minutes[0]} minutes`} */}
                                        </TypographyLight>
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </ThemeProvider>
                    <FlexBoxColumn sx={{ my: 'auto' }}>
                        <TypographyBold fontSize={12} sx={{ mt: 'auto', mx: 1 }}>
                            Minutes:
                        </TypographyBold>
                        <FlexBoxRow sx={{ mx: 'auto', my: 1 }}>
                            {minutes.map((minute, index) => {
                                return (
                                    <Fragment key={index}>
                                        {index > 0 && <TypographyBold sx={{mx:1}}> - </TypographyBold>}
                                        <FlexBoxRow>
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                value={minute}
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
                                                    if (minutes.length === 1) {
                                                        newMinutes = [value];
                                                    } else if (minutes.length === 2 && index === 0) {
                                                        newMinutes = [value, minutes[1]];
                                                    } else if (minutes.length === 2 && index === 1) {
                                                        newMinutes = [minutes[0], value];
                                                    }
                                                    setMinutes(newMinutes);
                                                }}
                                            />
                                        </FlexBoxRow>
                                    </Fragment>
                                );
                            })}
                        </FlexBoxRow>
                        <Payout minutes={minutes} categoryIndex={categoryIndex} />
                    </FlexBoxColumn>
                </FlexBoxRow>
            </CustomDialog>

            <ConfirmationBox
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                confirmationMessage={`Are you sure you want to edit this bet?`}
                selectNo={() => setOpenConfirmation(false)}
                selectYes={submitEdittedBet}
            />

            <CreateBetPopup
                open={showCreateBet}
                closeCreateBet={() => setShowCreateBet(false)}
                dates={upcomingMatchesByDate}
                user={user}
                categories={betCategories}
            />
        </Fragment>
    );
}