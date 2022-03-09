import { Avatar, ButtonGroup, Paper, Button, Grid } from "@mui/material";
import { Component, Fragment } from "react";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
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
            },
            badges: [],
            bets: [],
            banner: defaultBanner,
            isUserInfoLoading: true,
        };
    }
    /**
     * Fertches user info and bets, then update
     * the state.
     */
    async componentDidMount() {
        await this.fetchUserInfo();
        await this.fetchBets()
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
                    bets: await response.json()
                });
            }
        } catch (e) {
            console.log(e);
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
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <Fragment>
                <FlexBoxColumn width='82%' mx='auto' backgroundColor='#1E2A32'>
                    <Paper variant="outlined">
                        <img src={this.state.banner} alt="banner" height='256px'/>
                    </Paper>
                    <FlexBoxRow height='128px'>
                        <FlexBoxRow my="24px" marginLeft='24px' sx={{borderColor: '#f9f9f9', borderWidth: '5px', display: {xs: 'none', md: 'inherit'}, width: {xs: '10%', md: '50%'}}}>
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                            <img src="https://www.unrankedsmurfs.com/storage/YMoeDoxu3dKunABYwywDC05hf11tbWr6NQScWoWS.png" width='72px' height='72px' />
                        </FlexBoxRow>
                        <Avatar src={this.state.userInfo.profile_pic}
                            sx={{width: '256px', height: '256px', 
                                mx: 'auto', transform: 'translate(1px, -128px)'}}
                        />
                        <FlexBoxRow my="auto" marginRight='24px' 
                            sx={{justifyContent:'flex-end', width: {xs: '10%', md: '50%'}}}>
                            <ButtonGroup sx={{height: '36px' }}>
                
                                <Button variant='contained' startIcon={<BookmarkAddIcon />} 
                                    sx={{backgroundColor: '#c79a43', 
                                        display: {xs: 'none', md: 'inherit'}}}>
                                    <TypographyLight >
                                        Bookmark
                                    </TypographyLight>
                                </Button>
                                <Button variant='contained' sx={{backgroundColor: '#c79a43', 
                                    display: {xs: 'inherit', md: 'none'}}}>
                                    <BookmarkAddIcon />
                                </Button>
                                <Button variant='contained' startIcon={<AddReactionIcon />} 
                                    sx={{backgroundColor: 'rgb(0,100,100)', 
                                        ':hover': {backgroundColor: 'rgb(0,200,200)'}, 
                                        display: {xs: 'none', md: 'inherit'}}}>
                                    <TypographyLight >
                                        Add Friend
                                    </TypographyLight>
                                </Button>
                                <Button variant='contained' sx={{backgroundColor: 'rgb(0,100,100)', 
                                    display: {xs: 'inherit', md: 'none'}}}>
                                    <AddReactionIcon />
                                </Button>
                            </ButtonGroup>
                        </FlexBoxRow>
                    </FlexBoxRow>
                    <FlexBoxColumn justifyContent={'center'} 
                        my='24px' width={'fit-content'} height="32px" mx='auto'>
                        <TypographyBold fontSize='32px'>
                            {this.state.userInfo.username}
                        </TypographyBold>
                        <HorizontalDivider width='100%' />
                    </FlexBoxColumn>
                    <UserInfo userInfo={this.state.userInfo} />
                    <HorizontalDivider width='100%' />
                    <BetHistory bets={this.state.bets}
                        id={this.state.userInfo.user_id} />
                </FlexBoxColumn>
            </Fragment>
        );
    }
}
export default withRouter(Profile);