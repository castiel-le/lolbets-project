import { createContext, useState } from 'react';

// handler that will be used to control the snackbar's state
export const SnackbarContext = createContext({
    setSnackbar: () => {
    },
    snackbar: {}
});

export const SnackbarContainer = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: ''
    });

    // other components will be able to set snackbar
    const handleSnackbarSet = (open, message, type) => {
        setSnackbar({
            open, message, type
        })
    };

    const contextValue = {
        setSnackbar: handleSnackbarSet,
        snackbar
    };

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
        </SnackbarContext.Provider>
    )
};