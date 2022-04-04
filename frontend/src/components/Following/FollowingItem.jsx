import { Component, Fragment } from "react";
import {Avatar, Grid, Typography, Link, Button, Dialog, DialogTitle, DialogActions} from "@mui/material";
import { TypographyBold } from "../customUIComponents";

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

                <Dialog open={this.state.dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    PaperProps={{
                        style: {
                            backgroundColor: 'rgb(42, 59, 70)',
                            boxShadow:'0 0px 10px #f9f9f9',
                            width: '300px',
                            p: 1
                        },
                    }}>
                    <DialogTitle display="flex" alignItems="center" flexDirection="column">
                        <Avatar src={this.props.following.profile_pic} sx={{width: 90, height: 90}} />
                        <TypographyBold marginTop={1}>
                            Unfollow {this.props.following.user.username}?
                        </TypographyBold>
                    </DialogTitle>
                    <DialogActions>
                        <Button style={{color: "red"}} onClick={this.unfollow}>Unfollow</Button>
                        <Button  style={{color: "white"}} onClick={() => this.setState({dialogOpen: false})}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}