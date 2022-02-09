import { Component, Fragment } from "react";

import { Box, Drawer } from '@mui/material'

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
                <Drawer
                    anchor='right'
                    open={this.props.open}
                    onClose={this.props.toggleOpenDrawer}
                >

                </Drawer>
            </Fragment>
        );
    }
}