import { Avatar, Paper, Button, Grid } from "@mui/material";
import { Component, Fragment } from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { 
    FlexBoxColumn, 
    FlexBoxRow, 
    TypographyBold, 
    TypographyLight,  
    HorizontalDivider, 
} from "../customUIComponents";
import withRouter from "../withRouter";
import defaultBanner from "./images/defaultBanner.png";
import BetHistory from "./BetsHistory/BetHistory";
import UserInfo from "./UserInfo/UserInfo";
import ModButtons from "./ModButtons/ModButtons";
import { Loading } from "../customUIComponents";
import { SnackbarContext } from '../Snackbar/SnackbarContext'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                user_id: null,
                username: "",
                email: "",
                date_ceated: null,
                profile_pic: "",
                coins: "",
                bets_placed: "",
                rank: "",
                banned: null,
                timeout: null,
            },
            badges: [],
            bets: [],
            banner: defaultBanner,
            isUserInfoLoading: true,
            isBetsInfoLoading: true,
            isUserFollowed: false,
        };
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.followTheUser = this.followTheUser.bind(this);
        this.unfollowTheUser = this.unfollowTheUser.bind(this);
    }
    /**
     * Fertches user info and bets, then update
     * the state.
     */
    async componentDidMount() {
        await this.updateState();
    }

    /**
     * Checks if previous prop's user changed. If it changed, update    
     * the state of this component.
     * @param {*} prevProps previous props
     * @param {*} prevState previous state
     */
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.key !== this.props.key) {
            setUserInfoLoading(true);
        }
        if (prevProps.user !== this.props.user) {
            await this.updateState();
        }
    }

    setUserInfoLoading(status) {
        this.setState({isUserInfoLoading: status})
    }

    async updateState() {
        await this.fetchFollowStatus();
        await this.fetchUserInfo();
        await this.fetchBets();
    }

    /**
     * Fetch if logged in user follows user profile
     */
    async fetchFollowStatus() {
        if (this.props.params.id && this.props.user.id) {
            const url = "/api/follow/check";
            try {
                const response = await fetch(url + "?follower_id=" + this.props.user.id + "&following_id=" + this.props.params.id);
                if (response.ok) {
                    const followResult = await response.json();
                    if (followResult.result) {
                        this.setState({
                            isUserFollowed: true
                        });
                    } else {
                        this.setState({
                            isUserFollowed: false
                        })
                    }
                }
            } catch(e) {
                console.log("something went wrong");
            }
        }
    }

    /**
     * Fetches 5 recent bets of the user
     */
    async fetchBets() {
        // Retrieve :d from /user/:id if exist,
        // otherwise, get logged in user's id.
        const id = this.props.params.id
            ? this.props.params.id
            : this.props.user.id; 
        
        const url = "/api/user/history/";
        try {
            const response = await fetch(url + id + "?page=1&limit=5");
            if (response.ok) {
                this.setState({
                    bets: await response.json(),
                    isBetsInfoLoading: false,
                });
            }
        } catch (e) {
            console.log("Something went wrong");
        }
    }

    /**
     * Fetches user information and adds it to the component state.
     * isUsetInfoLoading will be set to false if fetch is successful.
     */
    async fetchUserInfo() {
        // Retrieve :d from /user/:id if exist,
        // otherwise, get logged in user's id.
        const id = this.props.params.id
            ? this.props.params.id
            : this.props.user.id; 
        
        const url = "/api/user/";
        try {
            const response = await fetch(url + id);
            if (response.ok) {
                this.setState({
                    isUserInfoLoading: false,
                    userInfo: await response.json()
                });
            // Redirect to 404 if no data found on user page
            } else if (this.props.params.id) {
                this.props.navigate("/404")
            // Redirect to home page when not logged in
            } else if (this.props.user.isLoaded) {
                this.props.navigate("/");
            }
        } catch (e) {
            this.props.navigate("/404");
        }
    }

    /**
     * Makes the logged in user follow the user who they are on the profile of
     */
    async followTheUser() {
        const url = "/api/follow";
        if (this.props.params.id && this.props.user.id) {
            const data = {
                follower_id: this.props.user.id,
                following_id: this.props.params.id
            }
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                this.context.setSnackbar(true, 'User followed', 'success');
                this.setState({
                    isUserFollowed: true
                });
            } else {
                this.context.setSnackbar(true, 'An error occured', 'error');
            }
            
        }
    }

    /**
     * Makes the logged in user unfollow the user who they are on the profile of
     */
    async unfollowTheUser() {
        const url = "/api/follow";
        if (this.props.params.id && this.props.user.id) {
            const data = {
                follower_id: this.props.user.id,
                following_id: this.props.params.id
            }
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                this.context.setSnackbar(true, 'User unfollowed', 'success');
                this.setState({
                    isUserFollowed: false
                });
            } else {
                this.context.setSnackbar(true, 'An error occured', 'error');
            }
            
        }
    }

    render() {
        // styling
        const styleTimeoutText = {color: "orange", width: "100%"};
        const styleBanText = {color: "red"};

        // Condition to determine if whether or not to display specific mod actions
        let showModActions = false;
        if (this.props.params.id) {
            // eslint-disable-next-line eqeqeq
            if (this.props.user.role === "moderator" && this.props.params.id != this.props.user.id) {
                showModActions = true;
            }
        }

        return (
            <Fragment>
                {this.state.isUserInfoLoading
                    ? <Loading />
                    :
                    <FlexBoxColumn width='82%' mx='auto' backgroundColor='#1E2A32'>
                        <Paper variant="outlined">
                            <img src={this.state.banner} alt="banner" height='256px'/>
                        </Paper>
                        <Grid container maxHeight={128}>
                            <Grid item xs={4}>
                                {/*Space*/}
                            </Grid>
                            <Grid item xs={4} display="flex" justifyContent="center">
                                <Avatar src={this.state.userInfo.profile_pic}
                                    sx={{width: '256px', height: '256px', 
                                        mx: 'auto', transform: 'translate(1px, -128px)'}}
                                />
                            </Grid>
                            <Grid item xs={4} display="flex" 
                                style={{flexFlow: "row-reverse wrap"}}
                                justifyContent="flex-start"
                                alignItems="flex-start">
                                {this.props.params.id && this.props.user.id
                                    ? 
                                    <>
                                        {!this.state.isUserFollowed 
                                            ? 
                                            <Button variant='contained' startIcon={<PersonAddAlt1Icon />} 
                                                sx={{backgroundColor: 'rgb(100,200,40)', 
                                                    ':hover': {backgroundColor: 'rgb(140,235,10)'}, 
                                                    display: {xs: 'none', md: 'inherit'}}}
                                                maxHeight={50}
                                                marginRight={1}
                                                onClick={this.followTheUser}>
                                                <TypographyLight >
                                                    Follow
                                                </TypographyLight>
                                            </Button>
                                            :
                                            <Button variant='contained' startIcon={<PersonRemoveAlt1Icon />} 
                                                sx={{backgroundColor: 'rgb(255,100,80)', 
                                                    ':hover': {backgroundColor: 'rgb(255,50,40)'}, 
                                                    display: {xs: 'none', md: 'inherit'}}}
                                                maxHeight={50}
                                                marginRight={1}
                                                onClick={this.unfollowTheUser}>
                                                <TypographyLight >
                                                    Unfollow
                                                </TypographyLight>
                                            </Button>} 
                                    </>
                                    : null
                                }
                            </Grid>
                        </Grid>
                        <FlexBoxColumn justifyContent={'center'} 
                            my='24px' width={'fit-content'} height="32px" mx='auto'>
                            <TypographyBold fontSize='32px'>
                                {this.state.userInfo.username}
                            </TypographyBold>
                            <HorizontalDivider width='100%' />
                        </FlexBoxColumn>
                        {showModActions
                            ?
                            <FlexBoxRow my="auto" 
                                alignSelf="center" marginTop={1} marginBottom={1}>
                                <ModButtons 
                                    userInfo={this.state.userInfo} 
                                    fetchUserInfo={this.fetchUserInfo} />
                            </FlexBoxRow>  
                            : null
                        }    
                        {this.state.userInfo.banned
                            ? 
                            <FlexBoxColumn my="auto" alignSelf="center" marginTop={1} marginBottom={1}>
                                <TypographyBold fontSize='32px' align="center" style={styleBanText}>
                                    Banned: {this.state.userInfo.banned.reason}
                                </TypographyBold>
                            </FlexBoxColumn>
                            : null
                        } 
                        {this.state.userInfo.timeout
                            ? 
                            <FlexBoxColumn my="auto" alignSelf="center" marginTop={1} marginBottom={1}>
                                <TypographyBold fontSize='32px' color="red" align="center" style={styleTimeoutText}>
                                        Timeout: {this.state.userInfo.timeout.reason}
                                </TypographyBold>
                                <TypographyBold fontSize='32px' color="red" align="center" style={styleTimeoutText}>
                                        Duration: {new Date(this.state.userInfo.timeout.end_date).toLocaleDateString()}
                                </TypographyBold>
                            </FlexBoxColumn>
                            : null
                        }
                        
                        <UserInfo userInfo={this.state.userInfo} />
                        <HorizontalDivider width='100%' />
                        <BetHistory bets={this.state.bets}
                            id={this.state.userInfo.user_id}
                            isBetsInfoLoading={this.state.isBetsInfoLoading} />
                            
                    </FlexBoxColumn>
                }
            </Fragment>
        );
    }
}
Profile.contextType = SnackbarContext;
export default withRouter(Profile);