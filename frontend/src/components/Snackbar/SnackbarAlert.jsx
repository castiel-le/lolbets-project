import {Component, forwardRef} from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from './SnackbarContext';
import { AlertTitle } from '@mui/material';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const vertical = "top";
const horizontal = "center"

/**
 * Creates a notification at the bottom of the page to tell the user if success or errors etc.
 * Types of notifications: success, error, warning, info
 */
export default class SnackbarAlert extends Component {

    render() {
        return (
            <SnackbarContext.Consumer>
                {value => 
                    <Snackbar 
                        open={value.snackbar.open} 
                        autoHideDuration={4000} 
                        onClose={() => value.setSnackbar(false, value.snackbar.message, value.snackbar.type, value.snackbar.title)} 
                        anchorOrigin={{ vertical, horizontal }}
                    >
                        <Alert severity={value.snackbar.type} sx={{ width: '100%', whiteSpace: 'pre', textAlign: 'left' }}>
                            {value.snackbar.title &&
                            <AlertTitle sx={{textAlign: 'left', mb: 1}}>
                                {value.snackbar.title}
                            </AlertTitle>
                            }
                            {value.snackbar.message}
                        </Alert>
                    </Snackbar>
                }
            </SnackbarContext.Consumer>
        );
    }
}