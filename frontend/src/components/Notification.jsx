import {Component, forwardRef} from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const vertical = "top";
const horizontal = "center"

/**
 * Creates a notification at the bottom of the page to tell the user if success or errors etc.
 * Types of notifications: success, error, warning, info
 */
export default class Notification extends Component {

    render() {
        return (
            <Snackbar 
                open={this.props.open} 
                autoHideDuration={5000} 
                onClose={this.props.close} 
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert severity={this.props.type} sx={{ width: '100%' }}>
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}