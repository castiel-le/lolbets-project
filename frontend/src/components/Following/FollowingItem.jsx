import { Component, Fragment } from "react";
import {Avatar, Grid, Typography, Link, Button, DialogTitle} from "@mui/material";
import { TypographyBold } from "../customUIComponents";
import ConfirmationBox from "../ReusedComponents/ConfirmationBox";

export default class FollowingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }
        this.unfollow = this.unfollow.bind(this);
    }

    async unfollow() {
        this.setState({dialogOpen: await this.props.unfollow(this.props.following)});
    }

    render() {
        return(
            <Fragment>
                <Grid container>
                    <Grid item xs={8} display="flex" alignItems="center">
                        <Avatar src={this.props.following.user.profile_pic}/>
                        <Link href={"/user/" + this.props.following.user.user_id} underline="none" color="inherit">
                            <Typography marginLeft={1}>{this.props.following.user.username}</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4} display="flex" alignItems="right" justifyContent="center">
                        <Button variant="outlined" sx={{borderColor: "rgb(100,200,40)", maxHeight: 40, 
                            ":hover": {borderColor: "red"}, padding: 1}}
                        onClick={() => this.setState({dialogOpen: true})}>
                            <Typography color="white" textTransform="capitalize" fontWeight="bold" fontSize={15}>
                            Following
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <ConfirmationBox
                    open={this.state.dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    selectNo={() => this.setState({dialogOpen: false})}
                    selectYes={() => this.unfollow()}
                >
                    <DialogTitle display="flex" alignItems="center" flexDirection="column">
                        <Avatar src={this.props.following.profile_pic} sx={{width: 90, height: 90}} />
                        <TypographyBold marginTop={1}>
                            Unfollow {this.props.following.user.username}?
                        </TypographyBold>
                    </DialogTitle>
                </ConfirmationBox>
            </Fragment>
        )
    }
}