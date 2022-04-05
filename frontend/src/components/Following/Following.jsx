import { Component } from "react";
import {CircularProgress, List, ListItem } from "@mui/material";
import {FlexBoxColumn, TypographyLight } from '../customUIComponents';
import { SnackbarContext } from "../Snackbar/SnackbarContext";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FollowingItem from "./FollowingItem";
import CustomDialog from '../ReusedComponents/CustomDialog/CustomDialog';

export default class Following extends Component {
    static contextType = SnackbarContext;
    constructor(props) {
        super(props);
        this.state = {
            following: [],
            isFetching: true,
        }
        this.unfollow = this.unfollow.bind(this);
    }

    async componentDidUpdate(prevProps, prevState) {
        // Check if open props changed from false to true
        if (!prevProps.open && this.props.open) {
            await this.getFollowing();
        }
    }    

    /**
     * This will attempt a GET request to get the following list 
     * of the user.
     */
    async getFollowing() {
        try {
            const url = "/api/follow/";
            const response = await fetch(url + this.props.user.id);

            if (response.ok) {
                this.setState({following: await response.json(), isFetching: false});
            } else {
                this.context.setSnackbar(true, "Failed to get following list. Please try again", "error");
            }
            
        } catch (e) {
            this.context.setSnackbar(true, "Something went wrong. Please try again later", "error");
        }
    }

    /**
     * This will attempt a DELETE request to unfollow a user
     * @param {Object} following following object 
     * @returns True if successful. False otherwise
     */
    async unfollow(following) {
        try {
            const url = "/api/follow";
            const data = {follower_id: this.props.user.id, following_id: following.user.user_id};
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                this.setState({following: this.state.following.filter(f => f !== following, 1)}, 
                    () => {
                        this.context.setSnackbar(true, `Unfollowed ${following.user.username}`, "success");
                        return true;
                    });
            } else {
                this.context.setSnackbar(true, "Failed to unfollow user. Please try again", "error");
                return false;
            }
        } catch (e) {
            console.log(e)
            this.context.setSnackbar(true, "Something went wrong. Please try again", "error");
            return false;
        }
    }

    render() {
        return(
            <CustomDialog
            open={this.props.open} 
            onClose={this.props.onClose}
            title={`${this.state.following.length} following`} 
            >
                {this.state.isFetching
                        ? <FlexBoxColumn alignItems="center" justifyContent="center" height="90%" width="100%">
                            <CircularProgress />
                        </FlexBoxColumn>
                        : this.state.following.length > 0
                            ?
                            <List sx={{overflow: "auto"}} height="100%">
                                {this.state.following.map(following => 
                                    <ListItem key={following.follow_id} style={{paddingLeft: 0, paddingRight: 0}}>
                                        <FollowingItem following={following} unfollow={this.unfollow}/>
                                    </ListItem>
                                )}
                            </List>
                            :
                            <FlexBoxColumn alignItems="center" justifyContent="center" height="90%" width="100%">
                                <PersonAddIcon sx={{fontSize: 70}} />
                                <TypographyLight fontSize={12} marginTop={1}>
                                You&apos;ll see all the people who you follow here
                                </TypographyLight>
                            </FlexBoxColumn>
                    }
            </CustomDialog>
        )
    }
}