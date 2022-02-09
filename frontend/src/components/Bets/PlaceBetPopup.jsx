import { Component, Fragment, forwardRef } from "react";

import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Avatar } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class PlaceBetDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    render() {
        return(
            <Fragment>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.toggleOpenBet}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Place Bet"}</DialogTitle>
                    <DialogContent>
                        <Box>
                            <Avatar />
                        </Box>
                        <DialogContentText id="alert-dialog-slide-description">
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.toggleOpenBet}>Cancel</Button>
                        <Button onClick={this.props.toggleOpenBet}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}